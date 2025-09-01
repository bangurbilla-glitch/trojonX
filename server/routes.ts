import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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

  const httpServer = createServer(app);

  return httpServer;
}
