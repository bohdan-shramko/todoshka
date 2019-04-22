import React, { Component } from 'react';
import './App.css';
import { Grid, Button } from '@material-ui/core';
import { ItemsBar, CommentsBar } from './components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setLanguage } from "redux-i18n";

const classes = {
  leftsideBar: {
    position: 'fixed',
    top: 0,
    left: 'inherit',
    height: '100%',
    width: '16.666667%',
    padding: 0,
    backgroundColor: '#4d6680',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  contentBar: {
    paddingLeft: '24px',
    marginLeft: 'calc(20% + 32px)'
  },
  title: {
    color: '#fff',
    fontWeight: 'lighter',
    fontSize: '36px',
    margin: '12px 24px'
  }
}

class App extends Component {
  selectLanguage = lang => {
    document.getElementById('languages-list').classList.add('hidden');
    let date = new Date(new Date().getTime() + 7200 * 1000);
    document.cookie = "applang=" + lang + "; path=/; expires=" + date.toUTCString();
    this.props.setLanguage(lang);
  }

  toggleLanguagesList = event => {
    event.stopPropagation();
    let target = document.getElementById('languages-list');
    if (target.classList.contains('hidden')) {
      target.classList.remove('hidden');
    } else {
      target.classList.add('hidden');
    }
  }

  render() {
    return (
      <Grid container style={{maxWidth: '1440px', margin: '0 auto'}}>
        <Grid item xs={2} style={classes.leftsideBar}>
          <p style={classes.title}>{this.context.t("TODO")}</p>

          <div className="languages-list-container">
            <Button
              variant="contained" 
              color="primary"
              style={{backgroundColor: '#4da6ff', display: 'flex', alignSelf: 'center', width: 'fit-content'}}
              onClick={this.toggleLanguagesList}
            >{this.context.t('SELECT LANGUAGE')}</Button>
            <div className="languages-list hidden" id="languages-list">
              <ul className="languages-list-ul">
                <li 
                  className="language" 
                  onClick={() => this.selectLanguage('ru')}
                  >РУС <img alt="ru" className="flag" src="/img/ru.png"/> Русский</li>
                <li 
                  className="language" 
                  onClick={() => this.selectLanguage('en')}
                  >EN <img alt="en" className="flag" src="/img/en.png"/> English</li>
                <li 
                  className="language" 
                  onClick={() => this.selectLanguage('fr')}
                  >FR <img alt="fr" className="flag" src="/img/fr.png"/> Francais</li>
                <li 
                  className="language" 
                  onClick={() => this.selectLanguage('pl')}
                  >PL <img alt="pl" className="flag" src="/img/pl.png"/> Polski</li>
              </ul>
            </div>
          </div>
        </Grid>

        <Grid item xs={10} style={classes.contentBar}>
          <Grid container spacing={24}>
            <ItemsBar/>

            <CommentsBar/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

App.contextTypes = {
  t: PropTypes.func.isRequired
}

App.propTypes = {
  setLanguage: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  lang: state.i18nState.lang
});

export default connect(mapStateToProps, { setLanguage })(App);
