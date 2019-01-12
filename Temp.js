UserID: '',
, AsyncStorage
componentWillMount() {
  AsyncStorage.getItem('userID').then((value) => {
      this.setState({ UserID: value });
  }).done();
}

query.equalTo("UserID", this.state.UserID);

this.state.UserID