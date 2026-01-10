/**
 * Home page - Portfolio showcase landing page
 */

import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  Stack
} from '@mui/material'
import { 
  Chat as ChatIcon,
  AutoAwesome as AIIcon,
  Storage as DatabaseIcon,
  Speed as PerformanceIcon,
  Security as SecurityIcon,
  SmartToy as LLMIcon,
  DataObject as APIIcon,
  Code as CodeIcon,
  ArrowForward as ArrowIcon,
  School as SchoolIcon,
  Lightbulb as LightbulbIcon,
  Explore as ExploreIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <AIIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'AI Integration',
      description: 'I learned how to integrate OpenAI GPT-3.5-turbo to convert natural language into SQL queries, experimenting with prompts and managing API responses.'
    },
    {
      icon: <DatabaseIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'SQL Generation',
      description: 'Built a system that dynamically generates SQL from conversational questions, handling relationships and complex queries automatically.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Query Security',
      description: 'Implemented SQL validation to ensure only safe SELECT queries run - learned about security best practices for database interactions.'
    },
    {
      icon: <LLMIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Context Management',
      description: 'Explored maintaining conversation context across queries, so follow-up questions like "out of them..." work correctly.'
    },
    {
      icon: <PerformanceIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Performance Optimization',
      description: 'Practiced optimizing for large datasets using virtual scrolling, memoization, and code splitting techniques.'
    },
    {
      icon: <APIIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Full-Stack Development',
      description: 'Built a complete FastAPI backend with session management and React frontend, learning to connect both sides effectively.'
    }
  ]

  const techStack = [
    'React 18 + TypeScript',
    'Material-UI (MUI)',
    'FastAPI + Python',
    'OpenAI GPT-3.5-turbo',
    'SQLite Database',
    'React Query',
    'Zustand State Management',
    'Vite Build Tool'
  ]

  const highlights = [
    'Learned to integrate OpenAI API with proper prompt engineering and context management',
    'Built a full-stack app from scratch with FastAPI backend and React TypeScript frontend',
    'Implemented SQL generation from natural language with security validation',
    'Explored state management patterns with Zustand and React Query',
    'Practiced performance optimization with virtual scrolling for large datasets'
  ]

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
            px: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box
              sx={{
                p: 3,
                borderRadius: '50%',
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChatIcon sx={{ fontSize: { xs: 48, md: 64 } }} />
            </Box>
          </Box>
          
          <Chip
            icon={<SchoolIcon />}
            label="Learning Project"
            color="primary"
            sx={{ mb: 3, fontSize: '0.95rem', py: 2.5, px: 1 }}
          />
          
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            AI Powered chatbot to retrieve data with Natural Language
          </Typography>
          
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            A pet project I built to explore AI, full-stack development, and natural language processing. 
            This chatbot converts everyday questions into SQL queries, making data analysis as easy as 
            having a conversation. Try it out and see what it can do!
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/chat')}
              endIcon={<ArrowIcon />}
              sx={{
                minHeight: 56,
                minWidth: { xs: '100%', sm: 200 },
                fontSize: '1.125rem',
                px: 4,
                py: 1.5,
              }}
            >
              Try It Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/chat')}
              sx={{
                minHeight: 56,
                minWidth: { xs: '100%', sm: 200 },
                fontSize: '1.125rem',
                px: 4,
                py: 1.5,
              }}
            >
              View Demo
            </Button>
          </Stack>
        </Box>

        {/* What is This Section */}
        <Card
          elevation={0}
          sx={{
            mb: { xs: 4, md: 6 },
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 600,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <PsychologyIcon sx={{ color: 'primary.main' }} />
              Why I Built This
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                mb: 2,
              }}
            >
              I wanted to learn how to integrate AI into real applications and build a full-stack project 
              from scratch. This chatbot was my way of exploring OpenAI's API, understanding how to 
              convert natural language to SQL, and building a complete web application with both frontend 
              and backend components.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: 'text.secondary',
                mb: 2,
              }}
            >
              The project works with an Uber trip dataset (100K+ records) and lets you ask questions 
              like "How many Prime SUV trips were booked on weekends?" in plain English. The system 
              converts your question into SQL, runs it safely, and gives you the answer in natural 
              language. It even remembers context from previous questions!
            </Typography>
          </CardContent>
        </Card>

        {/* What You Can Do Section */}
        <Card
          elevation={0}
          sx={{
            mb: { xs: 4, md: 6 },
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 600,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <ExploreIcon sx={{ color: 'primary.main' }} />
              What You Can Do Here
            </Typography>
            <Box component="ul" sx={{ pl: 2, mb: 0 }}>
              <Typography component="li" sx={{ mb: 2, fontSize: '1.125rem', lineHeight: 1.8 }}>
                <strong>Ask natural language questions:</strong> Try questions like "How many total trips are there?", 
                "What's the average booking value for Prime SUV?", or "Show me trips cancelled on weekends"
              </Typography>
              <Typography component="li" sx={{ mb: 2, fontSize: '1.125rem', lineHeight: 1.8 }}>
                <strong>Test context awareness:</strong> Ask a question, then follow up with "out of them, how many were on weekends?" 
                - the AI understands what "them" refers to from the conversation
              </Typography>
              <Typography component="li" sx={{ mb: 2, fontSize: '1.125rem', lineHeight: 1.8 }}>
                <strong>Explore the dataset:</strong> Ask about vehicle types, locations, booking status, dates, 
                revenue, ratings, cancellation reasons, and more
              </Typography>
              <Typography component="li" sx={{ mb: 2, fontSize: '1.125rem', lineHeight: 1.8 }}>
                <strong>Try complex queries:</strong> Ask questions that require aggregations, filters, joins, 
                and date calculations - the AI handles the SQL complexity for you
              </Typography>
              <Typography component="li" sx={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                <strong>Manage sessions:</strong> Your conversations are saved. Create new sessions or revisit 
                old ones from the sidebar to continue where you left off
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* What I Learned Section */}
        <Card
          elevation={0}
          sx={{
            mb: { xs: 4, md: 6 },
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 600,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <LightbulbIcon sx={{ color: 'primary.main' }} />
              What I Learned Building This
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    mb: 2,
                  }}
                >
                  <strong>AI Integration:</strong> How to work with OpenAI's API, handle prompts effectively, 
                  and manage conversation context
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    mb: 2,
                  }}
                >
                  <strong>SQL Generation:</strong> Converting natural language to SQL, validating queries 
                  for security, and handling edge cases
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                  }}
                >
                  <strong>Full-Stack Development:</strong> Building REST APIs with FastAPI, creating React 
                  UIs with TypeScript, and connecting frontend to backend
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    mb: 2,
                  }}
                >
                  <strong>State Management:</strong> Using Zustand and React Query for managing complex 
                  application state and server synchronization
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    mb: 2,
                  }}
                >
                  <strong>Performance Optimization:</strong> Virtual scrolling for large datasets, code 
                  splitting, and memoization techniques
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                  }}
                >
                  <strong>Production Practices:</strong> Error handling, loading states, retry mechanisms, 
                  and building user-friendly interfaces
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            mb: 4,
            textAlign: 'center',
          }}
        >
          Key Technologies I Used
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: { xs: 4, md: 6 } }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontWeight: 600, mb: 1.5 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>


        {/* Technical Highlights */}
        <Grid container spacing={3} sx={{ mb: { xs: 4, md: 6 } }}>
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                  }}
                >
                  Technical Stack
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {techStack.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      sx={{
                        mb: 1,
                        fontWeight: 500,
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                  }}
                >
                  What Makes This Interesting
                </Typography>
                <Box component="ul" sx={{ pl: 2, mb: 0 }}>
                  {highlights.map((highlight, index) => (
                    <Typography
                      key={index}
                      component="li"
                      sx={{
                        mb: 1.5,
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        color: 'text.secondary',
                      }}
                    >
                      {highlight}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default HomePage

