import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  Page,
  //main component
  SearchBar,
  //for display data
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter,
  MediaBox,
  MediaBoxHeader,
  MediaBoxBody,
  MediaBoxTitle,
  MediaBoxDescription,
  Cell,
  CellBody,
  CellFooter,
  Grids
} from 'react-weui';

import Toast from 'components/toast';
import _actions from './actions';

const appMsgIcon = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" />

const CellMore = () => (
  <Cell access link>
    <CellBody>More</CellBody>
    <CellFooter />
  </Cell>
)

class SearchPage extends React.Component {
  state = {
    searchText: '',
    results: ['test1', 'test2', 'test3']
  };

  componentWillMount() {
    this.props.fetchTrendingTags();
  }

  handleChange(text) {
    let results = [1, 2, 3];
    this.setState({
      results,
      searchText: text,
    });
  }

  render() {
    let { toastData, trendingTags } = this.props;
    if (toastData) {
      Toast[toastData.type](toastData.content, () => {
        this.props.toast({
          action: 'clear'
        });
      });
    }

    return (
      <div className="container">
        <SearchBar
          onChange={this.handleChange.bind(this)}
          placeholder="Enter keyword"
          lang={{
            cancel: 'Cancel'
          }}
        />

        <Panel style={{ display: this.state.searchText ? null : 'none' }}>
          <PanelHeader>
            {`Search Key: ${this.state.searchText}`}
          </PanelHeader>
          <PanelBody>
            {
              this.state.results.length > 0 ?
                this.state.results.map((item, i) => {
                  return (
                    <MediaBox key={i} type="appmsg" href="javascript:void(0);">
                      <MediaBoxHeader>{appMsgIcon}</MediaBoxHeader>
                      <MediaBoxBody>
                        <MediaBoxTitle>{item}</MediaBoxTitle>
                        <MediaBoxDescription>
                          You may like this name.
                        </MediaBoxDescription>
                      </MediaBoxBody>
                    </MediaBox>
                  )
                })
                : <MediaBox>Can't find any！</MediaBox>
            }
          </PanelBody>
          <PanelFooter href="javascript:void(0);">
            <CellMore />
          </PanelFooter>
        </Panel>

        <Grids style={{ display: this.state.searchText ? 'none' : null }} data={[{
          icon: appMsgIcon,
          label: 'Grid',
          href: 'javascript:;'
        }]} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  // return { trendingTags: state['search-page'].trendingTags };
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrendingTags: bindActionCreators(_actions.fetchTrendingTags, dispatch),
    toast: bindActionCreators(_actions.fetchTrendingTags, dispatch),
  };
}

SearchPage = connect(mapStateToProps, mapDispatchToProps)(SearchPage);
export default SearchPage;
