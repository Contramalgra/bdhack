import React from 'react';
import http from 'superagent';

export default class AnswersForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      materials: [],
      body: '',
      topic_id: this.props.topicId,
      material_cost: 0,
      materialInfo: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.addMaterial = this.addMaterial.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  getBDSkus(url) { // Extract BuildDirect SKUs from user-provided product URLs
    const rex = /[0-9]{8}/;
    return rex.exec(url)[0];
  }

  getProductInfo(sku, callback) {
    http.get(`/api/products/${sku}`)
      .end((err, res) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, res.body);
      });
  }

  addMaterial(){
    const materials = this.state.materials;
    const sku = this.getBDSkus(this.refs.material.value);

    this.getProductInfo(sku, (err, product) => {
      const info = this.state.materialInfo;
      if (err) {
        return window.alert('Something went wrong, sorry');
      }
      let cost = this.state.material_cost;
      cost += product.data.pricingTiers[0].retailPrice;
      info.push(product);
      this.setState({material_cost: cost, materialInfo: info});
    });

    materials.push(sku);
    this.setState({materials});
    this.refs.material.value = "";
  }

  handleSubmit(e) {
    e.preventDefault();
    const state = this.state;
    delete state.materialInfo;
    http.post(`/topics/${this.props.topicId}/answers`)
      .send(state)
      .end((err, res) => {
        if (err) {
          return window.alert('Something went wrong, sorry');
        }
        this.setState({
          materials: [],
          body: '',
          material_cost: 0,
          materialInfo: []
        });
        return this.props.onNewAnswer(res.body);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Body:<br />
        <input type="text" name="body" onChange={this.handleChange} value={this.state.body} /><br />
        Materials
        {this.state.materialInfo.map((product, index) => (
          <span key={index} className="product-preview">
            <img src={product.data.mainImage.thumbnails[1].url} />
            <div>{product.data.productItemName}</div>
          </span>
        ))}
        <div>
          Total cost: {this.state.material_cost.toFixed(2)}
        </div>
        <input type="text" name="material" ref="material"/><button type="button" onClick={this.addMaterial}>Add Material</button><br />
        <button>Submit</button>
      </form>
    )
  }
}