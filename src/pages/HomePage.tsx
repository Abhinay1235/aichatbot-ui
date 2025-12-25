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
  Stack,
  Divider
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
  ArrowForward as ArrowIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <AIIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'AI-Powered Analysis',
      description: 'Leverages OpenAI GPT-3.5-turbo to convert natural language queries into SQL, making data analysis accessible to everyone.'
    },
    {
      icon: <DatabaseIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Real-Time SQL Generation',
      description: 'Dynamically generates optimized SQL queries from conversational questions, handling complex data relationships.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure Query Execution',
      description: 'Built-in SQL validation and security checks ensure only safe SELECT queries are executed on the database.'
    },
    {
      icon: <LLMIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Context-Aware Conversations',
      description: 'Maintains conversation context across multiple queries, understanding references like "them", "those", and follow-up questions.'
    },
    {
      icon: <PerformanceIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'High Performance',
      description: 'Virtual scrolling, code splitting, and memoization ensure smooth performance even with large datasets (100K+ records).'
    },
    {
      icon: <APIIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'RESTful API Architecture',
      description: 'Clean FastAPI backend with session management, conversation history, and scalable microservices architecture.'
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
    'Cost-optimized architecture using GPT-3.5-turbo (~$0.0015/1K tokens)',
    'Mobile-first responsive design with accessibility (WCAG 2.1 AA compliant)',
    'Dynamic context resolution from conversation history',
    'Virtual scrolling for handling 100K+ data records efficiently',
    'Production-ready with error handling, loading states, and retry mechanisms'
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
            AI-Powered Data Analytics Chatbot
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
            An intelligent chatbot that transforms natural language questions into SQL queries, 
            enabling seamless interaction with large datasets. Built with modern web technologies 
            and AI integration for portfolio demonstration.
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
              <CodeIcon sx={{ color: 'primary.main' }} />
              What is This Project?
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
              This is a full-stack AI-powered analytics platform that demonstrates advanced 
              software engineering skills. The application allows users to interact with a 
              large Uber trip dataset (100K+ records) using natural language, making complex 
              data analysis accessible through conversational AI.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                lineHeight: 1.8,
                color: 'text.secondary',
              }}
            >
              The system intelligently converts questions like "How many Prime SUV trips were 
              booked on weekends?" into optimized SQL queries, executes them safely, and 
              presents results in natural language. It maintains conversation context, 
              understands follow-up questions, and handles complex data relationships.
            </Typography>
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
          Key Features & Technologies
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

        {/* How to Use Section */}
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
              }}
            >
              How to Use
            </Typography>
            <Box component="ol" sx={{ pl: 2, mb: 0 }}>
              <Typography component="li" sx={{ mb: 2, fontSize: '1.125rem', lineHeight: 1.8 }}>
                <strong>Start a conversation:</strong> Click "Try It Now" to begin chatting with the AI assistant.
              </Typography>
              <Typography component="li" sx={{ mb: 2, fontSize: '1.125rem', lineHeight: 1.8 }}>
                <strong>Ask questions naturally:</strong> Type questions like "How many total trips are there?" or 
                "What is the average booking value for Prime SUV?"
              </Typography>
              <Typography component="li" sx={{ mb: 2, fontSize: '1.125rem', lineHeight: 1.8 }}>
                <strong>Follow-up questions:</strong> The AI maintains context, so you can ask follow-ups like 
                "out of them, how many were booked on weekends?" and it will understand what "them" refers to.
              </Typography>
              <Typography component="li" sx={{ mb: 2, fontSize: '1.125rem', lineHeight: 1.8 }}>
                <strong>Session management:</strong> Your conversations are saved in sessions. Access previous 
                sessions from the sidebar to continue where you left off.
              </Typography>
              <Typography component="li" sx={{ fontSize: '1.125rem', lineHeight: 1.8 }}>
                <strong>Explore the data:</strong> Ask about vehicle types, locations, booking status, dates, 
                revenue, ratings, and more. The AI handles complex queries automatically.
              </Typography>
            </Box>
          </CardContent>
        </Card>

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
                  Project Highlights
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

        {/* CTA Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 4, md: 6 },
            px: { xs: 2, sm: 0 },
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
            }}
          >
            Ready to Explore?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Start asking questions and see how AI makes data analysis conversational
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/chat')}
            endIcon={<ArrowIcon />}
            sx={{
              minHeight: 56,
              minWidth: 200,
              fontSize: '1.125rem',
              px: 4,
              py: 1.5,
              backgroundColor: 'background.paper',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'background.default',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage

