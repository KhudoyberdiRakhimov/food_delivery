import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { fade, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp'
import MotorcycleIcon from '@material-ui/icons/Motorcycle'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import MailIcon from '@material-ui/icons/Mail'
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { addToCart, getCartItems } from '../../actions/visitor'
import CheckBox from './Sections/CheckBox'
import RadioBox from './Sections/RadioBox'
import { price, categories } from './Sections/Datas'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  linkTag: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  floatButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  accordion: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Home = ({
  auth,
  visitor,
  history,
  addToCart,
  logout,
  getCartItems
}) => {
  const classes = useStyles();
  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState()
  const [SearchTerms, setSearchTerms] = useState("")
  const [Filters, setFilters] = useState({
    category: [],
    price: [],
  })

  useEffect(() => {

    const variables = {
      skip: Skip,
      limit: Limit,
    }

    getProducts(variables)

  }, [])

  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }
 
  const getProducts = (variables) => {
    Axios.post('/api/product/getProducts', variables)
      .then(response => {
        if (response.data.success) {
          if (variables.loadMore) {
            setProducts([...Products, ...response.data.products])
          } else {
            setProducts(response.data.products)
          }
          setPostSize(response.data.postSize)
        } else {
          alert('Failed to fetch product datas')
        }
      })
  }

  const onLoadMore = () => {
    let skip = Skip + Limit

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerms,
    }
    getProducts(variables)
    setSkip(skip)
  }

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    }
    getProducts(variables)
    setSkip(0)
  }

  const handlePrice = (value) => {
    const data = price
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array
      }
    }
    console.log('array', array)
    return array
  }

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters }

    newFilters[category] = filters

    if (category === 'price') {
      let priceValues = handlePrice(filters)
      newFilters[category] = priceValues
    }

    console.log(newFilters)

    showFilteredResults(newFilters)
    setFilters(newFilters)
  }

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    }

    setSkip(0)
    setSearchTerms(newSearchTerm)

    getProducts(variables);
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className={classes.linkTag} to='/' onClick={logout}>
          Logout
        </Link>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <Link to='/cart' className={classes.linkTag}>
          <IconButton aria-label='show 11 new notifications' color='inherit'>
            <Badge
              badgeContent={
                visitor.userData
                  ? visitor.userData.cart.length
                  : auth.visitor
                  ? auth.visitor.cart.length
                  : 0
              }
              color='secondary'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='absolute'>
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            yemish.uz
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              onChange={(e) => updateSearchTerms(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label='show 17 new notifications' color='inherit'>
              <Link to='/cart' className={classes.linkTag}>
                <Badge
                  badgeContent={
                    visitor.userData
                      ? visitor.userData.cart.length
                      : auth.visitor
                      ? auth.visitor.cart.length
                      : 0
                  }
                  color='secondary'>
                  <ShoppingCartIcon />
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'>
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'>
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Accordion>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'>
              <IconButton aria-label='filter' className={classes.heading}>
                <FilterListIcon />
                Filter
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              <CheckBox
                list={categories}
                handleFilters={(filters) => handleFilters(filters, 'category')}
              />
              <Divider />
              <RadioBox
                list={price}
                handleFilters={(filters) => handleFilters(filters, 'price')}
              />
            </AccordionDetails>
          </Accordion>
          <Grid container className={classes.cardGrid} spacing={2}>
            {Products.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.images[0]}
                    title='Image title'
                  />
                  <Link
                    className={classes.linkTag}
                    to={`/product/${card.user._id}`}>
                    <CardHeader
                      avatar={
                        <Avatar
                          alt='Product Image'
                          aria-label='recipe'
                          src={card.user.logos[0]}
                        />
                      }
                      title={card.title}
                      subheader={card.description}
                    />
                  </Link>
                  <CardActions>
                    <IconButton aria-label='add to favorites'>
                      <MotorcycleIcon />${card.deliveryPrice}
                    </IconButton>
                    <IconButton aria-label='share'>
                      <AccessTimeIcon />
                    </IconButton>
                    <IconButton
                      color='primary'
                      aria-label='add to cart'
                      onClick={() => addToCart(card._id, auth.visitor._id)}>
                      <AddCircleSharpIcon />${card.price}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Grid container justify='center'>
          <Button>More...</Button>
        </Grid>
      </main>
    </div>
  );
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  getCartItems: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  visitor: state.visitor
});

export default connect(mapStateToProps, { getCartItems, addToCart, logout })(Home);
