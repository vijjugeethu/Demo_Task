import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

const formatNumber = (number) => new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);
const urls = [
  'api/branch1.json',
  'api/branch2.json',
  'api/branch3.json'
];

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      sum: [],
      search:null
    };  
  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }

  componentDidMount = () => {
    Promise.all(
      urls.map(url =>
        axios.get(url)
      )).then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
        return response.data;
      }));
    }).then(data => {
      // Log the data to the console
      // You would do something with both sets of data here
      this.setState({ products: data });
      console.log('products'+this.state.products)
      console.log('data'+data);
    }).catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });


  }
  
  render() {
    const products = this.state
    console.log('total'+JSON.stringify(products))
    
   /* const ProductTotal = products.products.filter((data)=>{
              if(this.state.search == null)
                return data
              else if(data.name.toLowerCase().includes(this.state.search.toLowerCase())) {
                return data
        }
        }).reduce((totalProducts, product) => totalProducts + product.unitPrice, 0);
    console.log('total',JSON.stringify(ProductTotal)) */

    // const ProductTotal1 = products.products.map(({ products }) => {
    //   return products.reduce((prev, { unitPrice }) => {
    //     return +prev['unitPrice'].replace(/,/g, '') +  +unitPrice.replace(/,/g, '');
    //   });
    // });

    // const total = ProductTotal1.reduce((prev, next) => prev + next);

    // console.log(total);

  /*  const ProductTotal = products.products.filter((data)=>{
      if(this.state.search == null)
        return data
      else if(data.name.toLowerCase().includes(this.state.search.toLowerCase())) {
        return data
      }
    });*/
    let ProductTotal;
    if(this.state.search == null) {
      ProductTotal = products.products;
    } else {
      ProductTotal = products.products.reduce((acc,data)=>{
        const ch = data.products && data.products.filter(b => 
          b.name.toString().toLowerCase().includes(this.state.search.toString().toLowerCase()));
        if(ch && ch.length) acc.push({...data, products: ch});
        return acc;
      },[]);
    }
    console.log("ProductTotal"+JSON.stringify(ProductTotal));

    const branchWisRevenue = ProductTotal.reduce((acc, course) => {
      acc[course.branchId] = course.products.reduce((acc, el) => acc + el.unitPrice, 0);
      return acc;

    }, {});
    var branchWisRevenueArr = Object.values(branchWisRevenue);
    const sum_all = branchWisRevenueArr.reduce((sum, sum_one) => sum + sum_one, 0);
    // this.setState({ sum: sum});
   /* console.log("Sum****"+JSON.stringify(sum));
    const exercises_courses = products.products.map(item => {
      item.products.reduce((sum, part) => sum + part.unitPrice, 0);
      return sum;
    })*/
    //const sum_all = exercises_courses.reduce((sum, sum_one) => sum + sum_one, 0);
    ////console.log(JSON.stringify(exercises_courses));

    //const latest = newdata.reduce((sum, sum_one) => sum + sum_one, 0);
    //console.log("sum all============"+JSON.stringify(latest));
    ///////search/////////////////

    

    return (
      <div className="product-list">
        <label>Search Products</label>
        <input type="text" onChange={(e)=>this.searchSpace(e)}/>
        
        <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
         
          {ProductTotal.map((item, index) => (
            
              item.products.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{formatNumber(c.unitPrice)}</td>
                
                </tr>
              ))
           
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{formatNumber(sum_all)}</td>
          </tr>
        </tfoot>
      </table>
      
    </div>
    
  );
  }
}

export default App;

 // {
          //   this.state.todos && 
          //   Object.keys(icon).map(function (element) {
          //      return <tr>
          //        <td>{element}</td>
          //        <td>{icon[element]}</td>
          //      </tr>;
          //     })
          // }
          /////////////
           // {products.products.map(image => <div>{image.name}</div>)}

        //    {
        //     products.products.filter((data)=>{
        //       if(this.state.search == null)
        //         return data
        //       else if(data.name.toLowerCase().includes(this.state.search.toLowerCase())) {
        //         return data
        // }
        // }).map(function (element) {
        //        return <tr>
        //          <td>{element.name}</td>
        //          <td>{element.unitPrice}</td>
        //        </tr>;
        //       })
        //   }