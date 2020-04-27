import React,{ Component,createContext} from 'react';
import { fireauth} from '../firebaseconfig';

export const UserContext=createContext();

class Userprovider extends Component {

    state = {user:{},loaded:false};
    
      authListener = () => {
        fireauth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({user,loaded:true});
        } else {
            this.setState({user:null});
          }
        });
      }
    
      componentDidMount = () => {
        this.authListener();
      }


    render() {
        const {children}=this.props;
        return (
            <UserContext.Provider value={this.state}>{children}</UserContext.Provider>
        );
    }
}

export default Userprovider;