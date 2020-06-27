import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResult from '../image-result/ImageResult'

class Serch extends Component {
  state = {
    serchText: "",
    amount: 15,
    apiUrl: "https://pixabay.com/api",
    apiKey: "17237441-bded82e5a5dfc700ca4fb9638",
    images: [],
  };

  onTextChange = (e) => {
      const val =e.target.value
    this.setState({ [e.target.name]: val }, () => {
        if (val === '') {
            this.setState({images:[]})
        }else{
            axios.get(
                `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.serchText}&image_type=photo&per_page=${this.state.amount}&safeserch=true`
              )
              .then(res => this.setState({images:res.data.hits}))
              .catch(err => console.log(err))
        }
      
    });
  };

  onAmountChange = (e,index , value) =>this.setState({amount:value})

  render() {
      console.log(this.state.images)
    return (
      <div>
        <TextField
          name="serchText"
          value={this.state.serchText}
          onChange={this.onTextChange}
          floatingLabelText="Serch For Image"
          fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10 " />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>

        <br />
{this.state.images.length >0 ? (<ImageResult images={this.state.images} />) : null }
        
      </div>
    );
  }
}
export default Serch;
