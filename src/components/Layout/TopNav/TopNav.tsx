import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import { CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { messageUtil, theme } from '@/utils'
import useAuthStore from '@/store/auth'

interface Props {
  window?: () => Window
}

const drawerWidth = 240
const siteTitle = '블로그 ADMIN 시스템'
const navItems = [
  { to: '/code', name: '공통코드 관리' },
  { to: '/menu', name: '메뉴 관리' },
  { to: '/category', name: '카테고리/태그 관리' },
  { to: '/post-reply', name: '포스트 댓글 관리' },
  { to: '/content', name: '콘텐츠 관리' },
  { to: '/satisfaction', name: '만족도조사 관리' },
  { to: '/search', name: '검색 관리' },
  // { to: '/program', name: '프로그램 관리' }
]

/** 레이아웃 탑메뉴 컴포넌트 */
export default function TopMenu(props: Props) {
  const css = `
    .topnav .active button {
      background-color: ${theme.palette.action.selected};
    }
    .topnav .active > li > div {
      background-color: rgba(0, 0, 0, 0.04);
    }
  `

  const authStore = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} className={`topnav`}>
      <Typography variant='h6' sx={{ my: 2 }}>
        <Link to='/'>{siteTitle}</Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            <ListItem key={item.to} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  )

  const { window } = props
  const container = window !== undefined ? () => window().document.body : undefined

  /** 로그아웃 */
  const logOut = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    
    const confirm = await messageUtil.confirmQuestion('로그아웃하시겠습니까?')
    if (!confirm) return

    authStore.logout()
  }

  return (
    <Box sx={{ display: 'flex' }} className={`topnav`}>
      <style>{css}</style>

      <CssBaseline />
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
          >
            <Link to='/'>{siteTitle}</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>
                <Button key={item.to} sx={{ color: '#fff' }}>
                  {item.name}
                </Button>
              </NavLink>
            ))}
          </Box>
          <Button color='inherit' onClick={logOut}>
            <LogoutIcon fontSize='small' />
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}
