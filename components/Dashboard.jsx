import React, { useState, useEffect } from 'react';
import { ApiClient } from 'adminjs';
import { Box, H2, Text, Icon, Button, Badge } from '@adminjs/design-system';

const api = new ApiClient();

const Dashboard = () => {
  const [data, setData] = useState({
    membersCount: 0,
    projectsCount: 0,
    eventsCount: 0,
    messagesCount: 0,
    recentMessages: []
  });

  useEffect(() => {
    api.getDashboard().then((response) => {
      setData(response.data);
    }).catch(err => {
      console.error('Failed to fetch dashboard data', err);
    });
  }, []);

  return (
    <Box p={30} style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      <Box 
        style={{
          background: 'linear-gradient(135deg, #D91B5C 0%, #A01140 100%)',
          color: 'white',
          padding: '40px',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          boxShadow: '0 10px 25px rgba(217, 27, 92, 0.3)'
        }}
      >
        <Box>
          <H2 style={{ color: 'white', marginBottom: '10px' }}>Welcome to Rotaract Kirtipur Admin Panel</H2>
          <Text style={{ fontSize: '16px', opacity: 0.9, marginBottom: '10px' }}>
            Manage your club's website, events, members, and communications all from one place.
          </Text>
          <Text style={{ fontSize: '14px', opacity: 0.8 }}>
            If any issues, contact <a href="https://satishchandrakarki.com.np/" target="_blank" rel="noopener noreferrer" style={{ color: '#fbd1dd', textDecoration: 'underline' }}>Satish Chandra Karki</a>.
          </Text>
        </Box>
        <Box style={{ display: 'flex', gap: '15px' }}>
          <Button as="a" href="/" target="_blank" variant="outlined" style={{ borderColor: 'white', color: 'white' }}>
            <Icon icon="Globe" /> View Live Site
          </Button>
        </Box>
      </Box>

      <H2 mb={20}>Overview Snapshot</H2>
      
      <Box 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}
      >
        <Box 
          bg="white" 
          p={24} 
          style={{ 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            borderTop: '4px solid #D91B5C'
          }}
        >
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <Text variant="sm" style={{ fontWeight: 'bold', color: '#718096', textTransform: 'uppercase' }}>Active Members</Text>
            <Icon icon="Users" color="#D91B5C" />
          </Box>
          <Box style={{ fontSize: '36px', fontWeight: 'bold', color: '#2D3748' }}>{data.membersCount}</Box>
        </Box>

        <Box 
          bg="white" 
          p={24} 
          style={{ 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            borderTop: '4px solid #3182CE'
          }}
        >
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <Text variant="sm" style={{ fontWeight: 'bold', color: '#718096', textTransform: 'uppercase' }}>Projects</Text>
            <Icon icon="Briefcase" color="#3182CE" />
          </Box>
          <Box style={{ fontSize: '36px', fontWeight: 'bold', color: '#2D3748' }}>{data.projectsCount}</Box>
        </Box>

        <Box 
          bg="white" 
          p={24} 
          style={{ 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            borderTop: '4px solid #38A169'
          }}
        >
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <Text variant="sm" style={{ fontWeight: 'bold', color: '#718096', textTransform: 'uppercase' }}>Events</Text>
            <Icon icon="Calendar" color="#38A169" />
          </Box>
          <Box style={{ fontSize: '36px', fontWeight: 'bold', color: '#2D3748' }}>{data.eventsCount}</Box>
        </Box>

        <Box 
          bg="white" 
          p={24} 
          style={{ 
            borderRadius: '8px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            borderTop: '4px solid #D69E2E'
          }}
        >
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <Text variant="sm" style={{ fontWeight: 'bold', color: '#718096', textTransform: 'uppercase' }}>Unread Messages</Text>
            <Icon icon="Mail" color="#D69E2E" />
          </Box>
          <Box style={{ fontSize: '36px', fontWeight: 'bold', color: '#2D3748' }}>{data.messagesCount}</Box>
        </Box>
      </Box>

      <Box display="flex" style={{ gap: '30px' }}>
        <Box flex={2} bg="white" p={30} style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <H2 style={{ marginBottom: '20px' }}>Recent Contact Messages</H2>
          {data.recentMessages && data.recentMessages.length > 0 ? (
            data.recentMessages.map((msg, i) => (
              <Box key={i} p={15} mb={15} style={{ border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <Text fontWeight="bold">{msg.name}</Text>
                  <Badge>{new Date(msg.createdAt).toLocaleDateString()}</Badge>
                </Box>
                <Text style={{ fontStyle: 'italic', color: '#4A5568', fontSize: '14px', marginBottom: '5px' }}>{msg.email}</Text>
                <Text>{msg.message}</Text>
              </Box>
            ))
          ) : (
            <Text color="grey" style={{ textAlign: 'center', padding: '20px' }}>No recent messages.</Text>
          )}
          
          {data.recentMessages && data.recentMessages.length > 0 && (
            <Button as="a" href="/admin/resources/ContactMessage" mt={20}>View All Messages</Button>
          )}
        </Box>

        <Box flex={1} bg="white" p={30} style={{ borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <H2 style={{ marginBottom: '20px' }}>Quick Links</H2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '15px' }}>
              <Button as="a" href="/admin/resources/Member/actions/new" variant="text" style={{ padding: 0 }}>
                <Icon icon="Plus" /> Add New Member
              </Button>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Button as="a" href="/admin/resources/Event/actions/new" variant="text" style={{ padding: 0 }}>
                <Icon icon="Calendar" /> Schedule Event
              </Button>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Button as="a" href="/admin/resources/Project/actions/new" variant="text" style={{ padding: 0 }}>
                <Icon icon="Briefcase" /> Create Project
              </Button>
            </li>
            <li style={{ marginBottom: '15px' }}>
              <Button as="a" href="/admin/resources/BulkEmail/actions/new" variant="text" style={{ padding: 0 }}>
                <Icon icon="Mail" /> Send Bulk Email
              </Button>
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
