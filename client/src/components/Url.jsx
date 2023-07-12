import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Snackbar } from '@mui/material';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import getShortUrl from '../services/getUrl';

const Url = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(shortUrl.toString());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await getShortUrl(longUrl);
    setShortUrl(process.env.REACT_APP_S2L + '/' + res);
  };
  const handleChange = (e) => {
    setLongUrl(e.target.value);
  };
  return (
    <>
      <Grid
        container
        spacing={1}
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '10%',
          paddingX: '10%',
          opacity: '100%',
          //   columns: '1',
        }}
      >
        <Grid
          item
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '10%',
            paddingX: '10%',
            opacity: '100%',
            paddingBottom: '10%',
          }}
        >
          <h1>Pico-URL</h1>
        </Grid>
        <Grid item>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextField
              fullWidth
              id='input-with-sx'
              variant='standard'
              size='large'
              placeholder='Link'
              color='error'
              inputProps={{
                style: {
                  height: '50px',
                  fontSize: '25px',
                  color: 'white',
                },
              }}
              onChange={(e) => handleChange(e)}
            />
          </Box>
        </Grid>
        <Grid
          item
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '10%',
            paddingX: '10%',
            opacity: '100%',
            //   columns: '1',
          }}
        >
          <Button
            color='success'
            variant='contained'
            onClick={(e) => handleSubmit(e)}
          >
            Go
          </Button>
        </Grid>
        {shortUrl.length === 0 ? (
          <></>
        ) : (
          <Grid
            item
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '10%',
              paddingX: '10%',
              opacity: '100%',
              //   columns: '1',
            }}
          >
            <Typography variant='h5' color='common.white'>
              Your Link is ready press copy
            </Typography>
          </Grid>
        )}
        {shortUrl.length !== 0 ? (
          <Grid
            item
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '10%',
              paddingX: '10%',
              opacity: '100%',
              //   columns: '1',
            }}
          >
            <Button onClick={handleClick}>Copy</Button>
            <Snackbar
              open={open}
              onClose={() => setOpen(false)}
              autoHideDuration={2000}
              message='Copied to clipboard'
            />
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
};

export default Url;
