import React, { useEffect, useState }from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../layout/HomeNavbar';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { addToCart } from '../../actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    marginTop: ''
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Home = ({
  auth: { visitor },
  history,
  addToCart
}) => {
  const classes = useStyles();
  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState()
  const [SearchTerms, setSearchTerms] = useState("")

  const [Filters, setFilters] = useState({
    categories: [],
    price: []
  })

  useEffect(() => {

    const variables = {
      skip: Skip,
      limit: Limit,
    }

    getProducts(variables)

  }, [])

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
          alert('Failed to fectch product datas')
        }
      })
  }

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
      searchTerm: SearchTerms
    }
    getProducts(variables)
    setSkip(skip)
  }

  const showFilteredResults = (filters) => {

    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters

    }
    getProducts(variables)
    setSkip(0)

  }
  const price = [12]
  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {

      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    console.log('array', array)
    return array
  }

  const handleFilters = (filters, category) => {

    const newFilters = { ...Filters }

    newFilters[category] = filters

    if (category === "price") {
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
      searchTerm: newSearchTerm
    }

    setSkip(0)
    setSearchTerms(newSearchTerm)

    getProducts(variables)
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid container spacing={4}>
            {Products.map((card) => (
              <Grid item key={card._id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.images[0]}
                    title="Image title"
                  />
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="Product Image"
                        aria-label="recipe"
                        src={card.images[0]}
                      />
                        }
                    title={card.title}
                    subheader={card.description}
                  />
                  <CardActions>
                    <IconButton aria-label="add to favorites">
                      <MotorcycleIcon />${card.deliveryPrice}
                    </IconButton>
                    <IconButton aria-label="share">
                      <AccessTimeIcon />
                    </IconButton>
                    <IconButton 
                      color="primary"
                      aria-label="add to cart"
                      onClick={() => addToCart(card._id, visitor._id)}
                    >
                      <AddCircleSharpIcon />${card.price}
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addToCart })(Home);