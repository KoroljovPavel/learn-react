import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Articles from './routes/Articles';
import NotFound from './routes/NotFound';
import NewArticles from './NewArticles';
import UserForm from './UserForm';
import Filters from './Filters';
import Counter from './Counter';
import CommentsPage from './routes/CommentsPage';
import {Route, NavLink, Switch} from 'react-router-dom';
import history from '../history';
import {ConnectedRouter} from 'react-router-redux';
import LangProvider from './LangProvider';

class App extends Component {
    static propTypes = {};

    //Устанавливаем то что нам нужно в контекст
    static childContextTypes = {
        user: PropTypes.string
    };

    //Метод реакта получающий поле user
    getChildContext() {
        return {
            user: this.state.username
        }
    }

    //вместо контсруктора устанавливаем стейт
    state = {
        username: '',
        language: 'ru'
    };

    handleUserChange = username => this.setState({username});

    changeLanguage = language => e => this.setState({language});

    render() {
        return (
            <ConnectedRouter history={history}>
                <LangProvider language={this.state.language}>
                    <div>
                        <ul>
                            <li onClick={this.changeLanguage('en')}>English</li>
                            <li onClick={this.changeLanguage('ru')}>Russian</li>
                        </ul>
                        <div>
                            <h2>Main menu</h2>
                            <div><NavLink activeStyle={{color: 'red'}} to='/counter'>Counter</NavLink></div>
                            <div><NavLink activeStyle={{color: 'red'}} to='/filters'>Filters</NavLink></div>
                            <div><NavLink activeStyle={{color: 'red'}} to='/articles'>Articles</NavLink></div>
                        </div>
                        <UserForm value={this.state.username} onChange={this.handleUserChange}/>
                        {/*Чтоб не было конфликтов в пути /articles/new так как router думает что new єто id*/}
                        <Switch>
                            <Route path='/counter' component={Counter}/>
                            <Route path='/filters' component={Filters}/>
                            {/*Нужно обязательно ставить выше, тот который должен отображатся*/}
                            <Route path='/articles/new' component={NewArticles}/>
                            <Route path='/articles' component={Articles}/>
                            <Route path='/comments' component={CommentsPage}/>
                            {/*<Redirect from='/comments' to='/comments/1'/>*/}
                            <Route path='*' component={NotFound}/>
                        </Switch>
                    </div>
                </LangProvider>
            </ConnectedRouter>
        )
    }
}

export default App;