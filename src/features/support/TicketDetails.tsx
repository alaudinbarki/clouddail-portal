import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Chip,
    Divider,
    CircularProgress,
    Alert,
    Grid,
    Card,
    CardContent,
    Avatar,
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    Send as SendIcon,
    AttachFile as AttachIcon,
} from '@mui/icons-material';
import supportService from '../../services/supportService';
import type { Ticket } from '../../types/support';
import TicketStatusBadge from '../../components/support/TicketStatusBadge';

const TicketDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reply, setReply] = useState('');

    useEffect(() => {
        if (id) {
            loadTicket(id);
        }
    }, [id]);

    const loadTicket = async (ticketId: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await supportService.getTicketById(ticketId);
            setTicket(data);
        } catch (err) {
            setError('Failed to load ticket');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSendReply = () => {
        if (!reply.trim()) return;
        console.log('Sending reply:', reply);
        setReply('');
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error || !ticket) {
        return (
            <Box>
                <Alert severity="error">{error || 'Ticket not found'}</Alert>
                <Button startIcon={<BackIcon />} onClick={() => navigate('/support/tickets')} sx={{ mt: 2 }}>
                    Back to Tickets
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button startIcon={<BackIcon />} onClick={() => navigate('/support/tickets')}>
                        Back
                    </Button>
                    <Typography variant="h4">Ticket #{ticket.ticketNumber}</Typography>
                </Box>
                <TicketStatusBadge status={ticket.status} />
            </Box>

            <Grid container spacing={3}>
                {/* Ticket Details */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            {ticket.subject}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <Chip label={`Priority: ${ticket.priority.toUpperCase()}`} size="small" />
                            <Chip label={`Category: ${ticket.category}`} size="small" />
                        </Box>

                        <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                            {ticket.description}
                        </Typography>
                    </Paper>

                    {/* Conversation */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Conversation
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        {/* Mock messages */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Avatar>{ticket.userName.charAt(0)}</Avatar>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Typography variant="subtitle2">{ticket.userName}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(ticket.createdAt).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                                        <Typography variant="body2">{ticket.description}</Typography>
                                    </Paper>
                                </Box>
                            </Box>

                            {/* Admin reply example */}
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Box sx={{ flex: 1, maxWidth: '70%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, justifyContent: 'flex-end' }}>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(ticket.updatedAt).toLocaleString()}
                                        </Typography>
                                        <Typography variant="subtitle2">Support Agent</Typography>
                                    </Box>
                                    <Paper variant="outlined" sx={{ p: 2, bgcolor: 'primary.50' }}>
                                        <Typography variant="body2">
                                            Thank you for contacting us. We're looking into your issue and will get back to you shortly.
                                        </Typography>
                                    </Paper>
                                </Box>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>SA</Avatar>
                            </Box>
                        </Box>
                    </Paper>

                    {/* Reply Box */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Reply
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Type your reply..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            <Button startIcon={<AttachIcon />} variant="outlined">
                                Attach File
                            </Button>
                            <Button
                                startIcon={<SendIcon />}
                                variant="contained"
                                onClick={handleSendReply}
                                disabled={!reply.trim()}
                            >
                                Send Reply
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Sidebar */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Ticket Information
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Customer
                                </Typography>
                                <Typography variant="body1">{ticket.userName}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {ticket.userEmail}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Created
                                </Typography>
                                <Typography variant="body1">
                                    {new Date(ticket.createdAt).toLocaleString()}
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Last Updated
                                </Typography>
                                <Typography variant="body1">
                                    {new Date(ticket.updatedAt).toLocaleString()}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Button variant="outlined" fullWidth>
                                    Change Status
                                </Button>
                                <Button variant="outlined" fullWidth>
                                    Change Priority
                                </Button>
                                <Button variant="outlined" fullWidth>
                                    Assign Agent
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TicketDetails;
