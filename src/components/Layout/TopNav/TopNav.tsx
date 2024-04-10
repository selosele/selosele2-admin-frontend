import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router-dom'
import { messageUtil } from '@/utils'

/** 레이아웃 탑메뉴 컴포넌트 */
export default function TopMenu() {
  const navigate = useNavigate()

  /** 로그아웃 */
  const logOut = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    
    const confirm = await messageUtil.confirmQuestion('로그아웃하시겠습니까?')
    if (!confirm) return

    window.localStorage.removeItem('accessToken')
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            블로그 ADMIN 시스템
          </Typography>
          <Button color="inherit" onClick={logOut}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
