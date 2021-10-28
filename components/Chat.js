import React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import SendIcon from '@mui/icons-material/Send'
import Typography from '@mui/material/Typography'
import socket from '../services/ws.service'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const Chat = () => {
  const messageRef = React.useRef('')
  const nickRef = React.useRef('')
  const [messages, setMessages] = React.useState([])
  React.useEffect(() => {
    socket.on('CHAT', (message) => {
      messages.push(message)
      setMessages([...messages])
    })
  }, [])

  const messagesEndRef = React.useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = messageRef.current.value
    const name = nickRef.current.value
    socket.emit('CHAT', { message, name })
    messageRef.current.value = ''
  }
  return (
    <Paper component="form" sx={{ height: 450 }} onSubmit={handleSubmit}>
      <Grid container sx={{ height: '100%' }}>
        <Grid
          item
          xs={12}
          sx={{
            height: 50,
            textAlign: 'center',
            bgcolor: 'primary.main',
            p: 1,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="div" color="#ffff">
            Centro de control
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            height: '65%',
            overflowX: 'hidden',
            overflowWrap: 'break-word',
          }}
        >
          <List sx={{ overflowY: 'auto', p: 1 }}>
            {messages.map((element, index) => {
              const checkNick = () => element.name === nickRef.current.value
              const alignTo = checkNick() ? 'right' : 'left'
              const alignToReverse = checkNick() ? 'left' : 'right'
              const name = checkNick() ? 'You' : element.name
              return (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: '#f3f3f3',
                    mb: 2,
                    borderRadius: 2,
                  }}
                >
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align={alignTo} secondary={name} />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{ maxWidth: '100%' }}
                        align={alignTo}
                        primary={element.message}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align={alignToReverse}
                        secondary={new Date(element.date).toLocaleTimeString(
                          'cl-CL',
                          {
                            hour12: false,
                          }
                        )}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              )
            })}
            <div ref={messagesEndRef} />
          </List>
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={nickRef}
            fullWidth
            label="Nickname"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <InputBase
            autoFocus
            sx={{ ml: 1, flex: 1 }}
            placeholder="Type a message"
            inputProps={{ 'aria-label': 'send message' }}
            inputRef={messageRef}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="submit"
            color="primary"
            sx={{ p: '10px' }}
            aria-label="send"
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Chat
