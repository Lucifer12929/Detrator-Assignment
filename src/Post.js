import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography,Chip } from '@mui/material';
import { Alert } from '@mui/lab';
import './Post.css'

const Post=()=> {
  // Store post data
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Api calling
    axios
      .get('https://dummyjson.com/posts')
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <Container maxWidth="md"> 
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={1}>
        <>
        {posts?.map((post) => (
          <Grid item key={post.id}>
            {/* Each Card */}
            <Card>
              <CardContent>
                {/* Title component */}
                <Typography variant="h5" component="h2">
                  {post.title}
                </Typography>
                 {/* Body Component */}
                <Typography variant="body2" component="p">
                  {post.body}
                </Typography>
                {/* Tags Component */}
                <Typography variant="body3" component="tags">
                 {post.tags?.map((tag)=>(
                  <Chip label={tag} />
                 ))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </>      
      </Grid>
    </Container>
  );
}

export default Post;
