export default store => next => action => {
    console.log('---', 'prevState', store.getState());
    console.log('---', 'dispatching', action);
    next(action);
    console.log('---', 'nextState', store.getState());
}