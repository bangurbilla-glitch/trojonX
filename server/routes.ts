import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Notification types and functions
interface NotificationData {
  type: 'email' | 'sms';
  to: string;
  subject?: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

// Mock notification sending functions (in production, these would integrate with actual services)
const sendEmail = async (to: string, subject: string, message: string): Promise<boolean> => {
  console.log(`[EMAIL] To: ${to}, Subject: ${subject}, Message: ${message}`);
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

const sendSMS = async (to: string, message: string): Promise<boolean> => {
  console.log(`[SMS] To: ${to}, Message: ${message}`);
  // Simulate SMS sending delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return true;
};

export async function registerRoutes(app: Express): Promise<Server> {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

  // YouTube search endpoint
  app.get('/api/youtube/search', async (req, res) => {
    try {
      const { q, type = 'video' } = req.query;
      
      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      if (!YOUTUBE_API_KEY) {
        return res.status(500).json({ error: 'YouTube API key not configured' });
      }

      const searchParams = new URLSearchParams({
        part: 'snippet',
        q: q as string,
        type: type as string,
        maxResults: '25',
        key: YOUTUBE_API_KEY
      });

      const searchResponse = await fetch(`${YOUTUBE_API_BASE_URL}/search?${searchParams}`);
      const searchData = await searchResponse.json();

      if (!searchResponse.ok) {
        return res.status(400).json({ error: searchData.error?.message || 'YouTube API error' });
      }

      // If searching for videos, get additional statistics
      if (type === 'video') {
        const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
        
        if (videoIds) {
          const statsParams = new URLSearchParams({
            part: 'statistics,snippet',
            id: videoIds,
            key: YOUTUBE_API_KEY
          });

          const statsResponse = await fetch(`${YOUTUBE_API_BASE_URL}/videos?${statsParams}`);
          const statsData = await statsResponse.json();

          if (statsResponse.ok) {
            const enrichedItems = searchData.items.map((item: any) => {
              const videoStats = statsData.items.find((stat: any) => stat.id === item.id.videoId);
              return {
                id: item.id.videoId,
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
                description: item.snippet.description,
                viewCount: videoStats?.statistics?.viewCount || '0',
                likeCount: videoStats?.statistics?.likeCount || '0',
                commentCount: videoStats?.statistics?.commentCount || '0'
              };
            });

            return res.json({ items: enrichedItems });
          }
        }
      }

      // For channels or if video stats failed
      const formattedItems = searchData.items.map((item: any) => {
        if (type === 'channel') {
          return {
            id: item.id.channelId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            subscriberCount: '0',
            videoCount: '0',
            viewCount: '0'
          };
        } else {
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt,
            thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
            description: item.snippet.description,
            viewCount: '0',
            likeCount: '0',
            commentCount: '0'
          };
        }
      });

      res.json({ items: formattedItems });
    } catch (error) {
      console.error('YouTube search error:', error);
      res.status(500).json({ error: 'Failed to search YouTube' });
    }
  });

  // Get channel videos endpoint
  app.get('/api/youtube/channel/:channelId/videos', async (req, res) => {
    try {
      const { channelId } = req.params;

      if (!YOUTUBE_API_KEY) {
        return res.status(500).json({ error: 'YouTube API key not configured' });
      }

      // First get the channel's uploads playlist ID
      const channelParams = new URLSearchParams({
        part: 'contentDetails',
        id: channelId,
        key: YOUTUBE_API_KEY
      });

      const channelResponse = await fetch(`${YOUTUBE_API_BASE_URL}/channels?${channelParams}`);
      const channelData = await channelResponse.json();

      if (!channelResponse.ok) {
        return res.status(400).json({ error: channelData.error?.message || 'Channel not found' });
      }

      if (!channelData.items || channelData.items.length === 0) {
        return res.status(404).json({ error: 'Channel not found' });
      }

      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

      // Get videos from uploads playlist
      const playlistParams = new URLSearchParams({
        part: 'snippet',
        playlistId: uploadsPlaylistId,
        maxResults: '25',
        key: YOUTUBE_API_KEY
      });

      const playlistResponse = await fetch(`${YOUTUBE_API_BASE_URL}/playlistItems?${playlistParams}`);
      const playlistData = await playlistResponse.json();

      if (!playlistResponse.ok) {
        return res.status(400).json({ error: playlistData.error?.message || 'Failed to get videos' });
      }

      // Get video statistics
      const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
      
      if (videoIds) {
        const statsParams = new URLSearchParams({
          part: 'statistics',
          id: videoIds,
          key: YOUTUBE_API_KEY
        });

        const statsResponse = await fetch(`${YOUTUBE_API_BASE_URL}/videos?${statsParams}`);
        const statsData = await statsResponse.json();

        if (statsResponse.ok) {
          const enrichedItems = playlistData.items.map((item: any) => {
            const videoStats = statsData.items.find((stat: any) => stat.id === item.snippet.resourceId.videoId);
            return {
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              channelTitle: item.snippet.channelTitle,
              publishedAt: item.snippet.publishedAt,
              thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
              description: item.snippet.description,
              viewCount: videoStats?.statistics?.viewCount || '0',
              likeCount: videoStats?.statistics?.likeCount || '0',
              commentCount: videoStats?.statistics?.commentCount || '0'
            };
          });

          return res.json({ items: enrichedItems });
        }
      }

      // Fallback without stats
      const formattedItems = playlistData.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
        description: item.snippet.description,
        viewCount: '0',
        likeCount: '0',
        commentCount: '0'
      }));

      res.json({ items: formattedItems });
    } catch (error) {
      console.error('Channel videos error:', error);
      res.status(500).json({ error: 'Failed to get channel videos' });
    }
  });

  // Default analysis endpoint
  app.get('/api/youtube/analysis/default', async (req, res) => {
    try {
      // Simulate analysis with realistic data
      const defaultAnalysis = {
        sentiment: {
          positive: 42,
          neutral: 38,
          negative: 20
        },
        harmfulContent: {
          hateSpeech: 3,
          misinformation: 7,
          spam: 12
        },
        coordination: {
          botActivity: 15,
          campaigns: 2,
          riskScore: 25
        },
        trending: {
          topics: ['technology', 'politics', 'entertainment', 'education', 'gaming'],
          keywords: ['AI', 'machine learning', 'social media', 'content moderation', 'digital safety']
        },
        summary: {
          totalAnalyzed: 150,
          flaggedContent: 22,
          timestamp: new Date().toISOString()
        }
      };

      res.json(defaultAnalysis);
    } catch (error) {
      console.error('Default analysis error:', error);
      res.status(500).json({ error: 'Failed to generate analysis' });
    }
  });

  // Content analysis endpoint
  app.post('/api/youtube/analysis/content', async (req, res) => {
    try {
      const { videoIds } = req.body;

      if (!videoIds || !Array.isArray(videoIds) || videoIds.length === 0) {
        return res.status(400).json({ error: 'Video IDs are required for analysis' });
      }

      // Simulate content-specific analysis
      const analysisResults = {
        sentiment: {
          positive: Math.floor(Math.random() * 40) + 30,
          neutral: Math.floor(Math.random() * 30) + 25,
          negative: Math.floor(Math.random() * 30) + 15
        },
        harmfulContent: {
          hateSpeech: Math.floor(Math.random() * 8),
          misinformation: Math.floor(Math.random() * 12),
          spam: Math.floor(Math.random() * 20)
        },
        coordination: {
          botActivity: Math.floor(Math.random() * 30),
          campaigns: Math.floor(Math.random() * 5),
          riskScore: Math.floor(Math.random() * 100)
        },
        trending: {
          topics: ['news', 'viral', 'trending', 'breaking', 'update'],
          keywords: ['latest', 'breaking news', 'viral video', 'trending now', 'must watch']
        },
        videoAnalysis: videoIds.map(id => ({
          videoId: id,
          riskScore: Math.floor(Math.random() * 100),
          flags: Math.floor(Math.random() * 5),
          sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)]
        })),
        summary: {
          totalAnalyzed: videoIds.length,
          flaggedContent: Math.floor(videoIds.length * 0.2),
          timestamp: new Date().toISOString()
        }
      };

      res.json(analysisResults);
    } catch (error) {
      console.error('Content analysis error:', error);
      res.status(500).json({ error: 'Failed to analyze content' });
    }
  });

  // Notification endpoints
  app.post('/api/notifications/test-email', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email address is required' });
      }

      const success = await sendEmail(
        email,
        '[ContentGuard] Test Email Alert',
        'This is a test email notification from ContentGuard. If you received this, your email alerts are configured correctly.'
      );

      if (success) {
        res.json({ 
          success: true, 
          message: 'Test email sent successfully',
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(500).json({ error: 'Failed to send test email' });
      }
    } catch (error) {
      console.error('Test email error:', error);
      res.status(500).json({ error: 'Internal server error while sending test email' });
    }
  });

  app.post('/api/notifications/test-sms', async (req, res) => {
    try {
      const { phone } = req.body;
      
      if (!phone) {
        return res.status(400).json({ error: 'Phone number is required' });
      }

      const success = await sendSMS(
        phone,
        '[ContentGuard] Test SMS: Your SMS alerts are configured correctly. This is a test message.'
      );

      if (success) {
        res.json({ 
          success: true, 
          message: 'Test SMS sent successfully',
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(500).json({ error: 'Failed to send test SMS' });
      }
    } catch (error) {
      console.error('Test SMS error:', error);
      res.status(500).json({ error: 'Internal server error while sending test SMS' });
    }
  });

  app.post('/api/notifications/send-alert', async (req, res) => {
    try {
      const { notifications, threatData } = req.body;
      
      if (!notifications || !Array.isArray(notifications)) {
        return res.status(400).json({ error: 'Notifications array is required' });
      }

      const results = [];

      for (const notification of notifications) {
        try {
          let success = false;
          
          if (notification.type === 'email') {
            success = await sendEmail(
              notification.to,
              notification.subject || '[ContentGuard] Threat Alert',
              notification.message
            );
          } else if (notification.type === 'sms') {
            success = await sendSMS(
              notification.to,
              notification.message
            );
          }

          results.push({
            type: notification.type,
            to: notification.to,
            success,
            timestamp: new Date().toISOString()
          });
        } catch (error) {
          console.error(`Failed to send ${notification.type} to ${notification.to}:`, error);
          results.push({
            type: notification.type,
            to: notification.to,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
          });
        }
      }

      const successCount = results.filter(r => r.success).length;
      const totalCount = results.length;

      res.json({
        success: successCount > 0,
        message: `${successCount}/${totalCount} notifications sent successfully`,
        results,
        threatData: threatData || null
      });
    } catch (error) {
      console.error('Send alert error:', error);
      res.status(500).json({ error: 'Internal server error while sending alerts' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
