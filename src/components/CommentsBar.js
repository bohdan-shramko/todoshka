import React, { Component } from 'react'
import { Grid, Paper, TextField, Button, Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { addNewComment } from '../actions/itemActions';
import PropTypes from 'prop-types';

const classes = {
  title: {
    color: '#565a69',
    fontSize: '36px',
    fontWeight: 'lighter',
    margin: '0 0 24px 0'
  },
}

class CommentsBar extends Component {
  addComment = event => {
    let value = document.getElementById('contained-bare').value;
    if (value.replace(/\s/g, '').length > 0) {
      this.props.addNewComment(value);
    }
    document.getElementById('contained-bare').value = '';
  }

  render() {
    if (this.props.item) {
      let comments = this.props.item.comments.map((comment, index) => (
        <React.Fragment key={index}>
          <div className="comment">
            <Avatar className="avatar"/>
            <div className="comment-content">{comment.content}</div>
          </div>
          <hr />
        </React.Fragment>
      ));

      return (
        <Grid style={{ marginTop: '20px' }} item xs={6}>
          <Paper style={{ padding: '12px 24px 24px 24px' }}>
            <p style={classes.title}>{this.context.t('Comments')} #{this.props.item.id}</p>

            <div className="comments-section">{comments}</div>

            <div className="add-new-comment-form-section">
              <form noValidate autoComplete="o" className="add-new-comment-form">
                <div>
                  <Avatar className="avatar"/>
                  <TextField
                    id="contained-bare"
                    defaultValue=""
                    variant="outlined"
                    className="comment-textarea"
                  />
                </div>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={this.addComment}
                >
                  {this.context.t('Add new')}
                </Button>
              </form>
            </div>
          </Paper>
        </Grid>
      );
    }

    return (<React.Fragment/>);
  }
}

CommentsBar.contextTypes = {
  t: PropTypes.func.isRequired
}

CommentsBar.propTypes = {
  addNewComment: PropTypes.func.isRequired,
  item: PropTypes.object
}

const mapStateToProps = state => ({
  item: state.items.item
});

export default connect(mapStateToProps, { addNewComment })(CommentsBar);
