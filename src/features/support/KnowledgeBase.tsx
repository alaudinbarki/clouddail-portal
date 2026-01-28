import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    TextField,
    Button,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Chip,
    IconButton,
} from '@mui/material';
import {
    Search as SearchIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Article as ArticleIcon,
} from '@mui/icons-material';

const KnowledgeBase: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Articles', count: 45 },
        { id: 'getting-started', name: 'Getting Started', count: 12 },
        { id: 'esim-setup', name: 'eSIM Setup', count: 15 },
        { id: 'billing', name: 'Billing & Payments', count: 8 },
        { id: 'troubleshooting', name: 'Troubleshooting', count: 10 },
    ];

    const articles = [
        {
            id: '1',
            title: 'How to Activate Your eSIM',
            category: 'esim-setup',
            views: 1250,
            lastUpdated: new Date().toISOString(),
            status: 'published',
        },
        {
            id: '2',
            title: 'Understanding Data Plans',
            category: 'getting-started',
            views: 980,
            lastUpdated: new Date().toISOString(),
            status: 'published',
        },
        {
            id: '3',
            title: 'Payment Methods and Billing Cycle',
            category: 'billing',
            views: 750,
            lastUpdated: new Date().toISOString(),
            status: 'published',
        },
        {
            id: '4',
            title: 'Troubleshooting Connection Issues',
            category: 'troubleshooting',
            views: 620,
            lastUpdated: new Date().toISOString(),
            status: 'draft',
        },
    ];

    const stats = {
        totalArticles: 45,
        publishedArticles: 42,
        draftArticles: 3,
        totalViews: 25000,
    };

    const filteredArticles =
        selectedCategory === 'all' ? articles : articles.filter((a) => a.category === selectedCategory);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                    <Typography variant="h4">Knowledge Base</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Manage support articles and documentation
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}>
                    New Article
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Articles
                            </Typography>
                            <Typography variant="h4">{stats.totalArticles}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Published
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {stats.publishedArticles}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Drafts
                            </Typography>
                            <Typography variant="h4" color="warning.main">
                                {stats.draftArticles}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Views
                            </Typography>
                            <Typography variant="h4">{stats.totalViews.toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                {/* Categories Sidebar */}
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Categories
                        </Typography>
                        <List>
                            {categories.map((category) => (
                                <ListItem key={category.id} disablePadding>
                                    <ListItemButton
                                        selected={selectedCategory === category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                    >
                                        <ListItemText primary={category.name} />
                                        <Chip label={category.count} size="small" />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Articles List */}
                <Grid item xs={12} md={9}>
                    <Paper sx={{ p: 2 }}>
                        <TextField
                            fullWidth
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <List>
                            {filteredArticles.map((article) => (
                                <ListItem
                                    key={article.id}
                                    secondaryAction={
                                        <Box>
                                            <IconButton edge="end" size="small">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" size="small" color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    }
                                    sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}
                                >
                                    <ArticleIcon sx={{ mr: 2, color: 'primary.main' }} />
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body1" fontWeight="bold">
                                                    {article.title}
                                                </Typography>
                                                <Chip
                                                    label={article.status}
                                                    size="small"
                                                    color={article.status === 'published' ? 'success' : 'warning'}
                                                />
                                            </Box>
                                        }
                                        secondary={
                                            <Box sx={{ mt: 0.5 }}>
                                                <Typography variant="caption" color="text.secondary">
                                                    {article.views} views • Updated {new Date(article.lastUpdated).toLocaleDateString()}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default KnowledgeBase;
