import React, { Component } from 'react'
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { showItem, addItem, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

const classes = {
  title: {
    color: '#565a69',
    fontSize: '36px',
    fontWeight: 'lighter',
    margin: '0 0 24px 0',
    padding: '0 24px'
  },
  paper: {
    marginTop: '20px',
    paddingTop: '12px',
    paddingBottom: '24px'
  }
}

class ItemsBar extends Component {
  selectItem(id) {
    let item = this.props.items.find(item => item.id === id);
    this.props.showItem(item);
  }

  addNewItem = event => {
    let value = document.getElementById('outlined-bare').value;
    if (value.replace(/\s/g, '').length > 0) {
      this.props.addItem(value);
    }
    document.getElementById('outlined-bare').value = '';
  }

  deleteItem(id) {
    this.props.deleteItem(id)
  }

  render() {
    const items = this.props.items.map((item, index) => (
        <div 
          key={item.id} 
          onClick={() => this.selectItem(item.id)}
          className={this.props.item
                     ? item.id === this.props.item.id ? "item-block active" : "item-block"
                     : "item-block"}
          >
          <div className="item-content-block">
            <div className="item-content">{item.content}</div>
            <div className="item-comments-count">{item.comments.length}</div>
          </div>
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={e => {
              e.stopPropagation();
              this.deleteItem(item.id);
            }}
            className="item-delete"
          >
            {this.context.t('DELETE')}
          </Button>
        </div>
    ));

    return (
      <Grid item xs={6}>
        <Paper style={classes.paper}>
          <p style={classes.title}>{this.context.t('Items')}</p>

          <div className="add-new-item-form-section">
            <form noValidate autoComplete="o" className="add-new-item-form">
              <TextField
                id="outlined-bare"
                defaultValue=""
                variant="outlined"
                placeholder={this.context.t('Type name here') + "..."}
              />
              <Button 
                variant="contained" 
                color="primary"
                style={{backgroundColor: '#4da6ff'}}
                onClick={this.addNewItem}
              >
                {this.context.t('Add new')}
              </Button>
            </form>
          </div>

          <div className="items-section">
            {items}
            <hr style={{margin: '5px 24px 0 24px'}}/>
          </div>
        </Paper>
      </Grid>
    )
  }
}

ItemsBar.contextTypes = {
  t: PropTypes.func.isRequired
}

ItemsBar.propTypes = {
  showItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  item: PropTypes.object
}

const mapStateToProps = state => ({
  items: state.items.items,
  item: state.items.item
});

export default connect(mapStateToProps, { showItem, addItem, deleteItem })(ItemsBar);
