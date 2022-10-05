import { Box } from '@mui/material'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

function App() {
  const group = {
    name: 'Giga Chat',
    description: 'Giga Chat for Giga Chad&apos;s',
  }
  return (
    <Container className="container chatLayout">
      <Typography variant="h1" gutterBottom>
        {group.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {group.description}
      </Typography>
      <Typography>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo officiis
        accusamus maxime, debitis culpa maiores iure suscipit aspernatur
        corrupti fugiat eligendi explicabo pariatur unde sapiente rerum
        perferendis impedit amet est.
      </Typography>
    </Container>
  )
}

export default App
