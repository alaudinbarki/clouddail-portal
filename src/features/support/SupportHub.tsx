import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
} from '@mui/material';
import { Add as AddIcon, Article as ArticleIcon } from '@mui/icons-material';

const SupportHub: React.FC = () => {
    const categories = [
        { name: 'Getting Started', articles: 12 },
        { name: 'Account Management', articles: 8 },
        { name: 'eSIM Activation', articles: 15 },
        { name: 'Billing & Payments', articles: 10 },
        { name: 'Troubleshooting', articles: 20 },
    ];

    const popularArticles = [
        'How to activate your eSIM',
        'Understanding data usage',
        'Payment methods and billing',
        'Troubleshooting connection issues',
        'Managing multiple eSIMs',
    ];

    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4">Support Hub</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Create Ticket
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Categories */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Knowledge Base Categories
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            {categories.map((category) => (
                                <Grid item xs={12} sm={6} key={category.name}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <ArticleIcon color="primary" />
                                                <Typography variant="h6">{category.name}</Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {category.articles} articles
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>

                {/* Popular Articles */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Popular Articles
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            {popularArticles.map((article, index) => (
                                <React.Fragment key={index}>
                                    <ListItem
                                        component="div"
                                        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                                    >
                                        <ListItemText primary={article} />
                                    </ListItem>
                                    {index < popularArticles.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SupportHub;
