# ContentGuard - Social Media Content Analysis Platform

## Overview

ContentGuard is a comprehensive social media content analysis platform designed to detect harmful content, coordinated campaigns, and suspicious activities across multiple social media platforms. The system provides real-time monitoring capabilities, file-based analysis, and detailed reporting with support for multiple languages. It combines machine learning-based classification with pattern detection to identify potential threats and coordinated information operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **State Management**: React Context API for global state management of analysis data and streaming connections
- **Routing**: React Router for client-side navigation between dashboard, upload, analysis, and settings pages
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Radix UI primitives for accessible, customizable components

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API development
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Shared TypeScript schemas using Zod for validation between frontend and backend
- **Development**: Hot reload and middleware-based architecture for scalable API development

### Data Storage Solutions
- **Primary Database**: PostgreSQL for structured data storage of users, analysis results, and content metadata
- **ORM**: Drizzle ORM chosen for type safety, performance, and excellent TypeScript integration
- **Migrations**: Drizzle Kit for database schema management and migrations
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple for user authentication

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL storage for persistent user authentication
- **User Schema**: Simple username/password authentication with bcrypt hashing (implementation pending)
- **API Security**: Middleware-based request logging and error handling for API endpoints

### Content Analysis Engine
- **Multi-platform Support**: Designed to analyze content from Twitter/X, Reddit, YouTube, and custom uploads
- **Classification System**: Machine learning-based content classification for harmful content detection
- **Coordination Detection**: Pattern analysis for identifying coordinated campaigns and bot networks
- **Language Support**: Multi-language content analysis capabilities
- **Real-time Processing**: Streaming analysis for live social media monitoring

## External Dependencies

### Database and Infrastructure
- **Neon Database**: Serverless PostgreSQL database using @neondatabase/serverless driver
- **Database Configuration**: Environment-based configuration with DATABASE_URL for flexible deployment

### UI Framework and Components
- **shadcn/ui**: Comprehensive UI component library built on Radix UI primitives
- **Radix UI**: Accessible, unstyled UI components for complex interfaces
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography across the application

### Development and Build Tools
- **Vite**: Fast build tool with React plugin for development and production builds
- **TypeScript**: Static type checking for both frontend and backend code
- **ESBuild**: Fast JavaScript bundler for server-side code compilation
- **Replit Integration**: Development environment integration with runtime error overlay

### Data Processing Libraries
- **React Hook Form**: Form state management with validation
- **TanStack Query**: Data fetching, caching, and synchronization for API calls
- **date-fns**: Date manipulation and formatting utilities
- **React Dropzone**: File upload interface for dataset uploads

### Social Media APIs (Planned Integration)
- **Twitter API v2**: Real-time tweet analysis and monitoring
- **Reddit API**: Subreddit and comment analysis
- **YouTube Data API**: Comment and community post monitoring
- **Custom Data Formats**: Support for CSV, JSON, and TXT file uploads