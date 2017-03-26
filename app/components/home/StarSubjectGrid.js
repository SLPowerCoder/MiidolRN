/**
 * created by sunlei on 16/12/26
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  InteractionManager,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Dimensions,
  RefreshControl,
  Image,
} from 'react-native';

import Constants from '../../common/constants'
import NetUtil from '../../common/NetUtil'
import {starSubjectAction} from '../../actions/MainViewAction';

export default class StarSubjectGrid extends Component{

  constructor(props){
    super(props)
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows([]),
        isRefreshing:true
      }
  }

  componentDidMount(){
    console.log('componentDidMount')
        //数据请求
        InteractionManager.runAfterInteractions(() => {
            // this.getNetData();
            let {dispatch} = this.props;
            dispatch(starSubjectAction(false,true));
        });
  }

  getNetData(){
        //获取首页网络数据
        let param = {}
        /**
            tabData的结构如下
            {
                "cataId": "1",
                "name": "鹿晗",
                "cataType": "1",
                "sortId": "14",
                "specialPic": "http://pics.miidol.com:85/upload/video/2016/07/02/20160702070926474.png"
            },
        */
    
        // console.log(`~~~~cataType===${this.props.tabData.cataType} ~~~~~~~~~url::${urlStr}`)

        NetUtil.post(Constants.urlSet.ChannelTitleList, param, (jasonData) => {
            //下面是请求下来的数据
            console.log('********~~~~~~~~~~~频道裂波表数据jasonData**********')
            console.log(jasonData);
            //banner数据
            this.dataObj = jasonData.data
            // console.log('********titleList**********')
            // console.log(this.titleList)
            /////***************************//////
            this.setState({
                // 一定要用dataSource的cloneWithXXXX来克隆数据源
                dataSource: this.state.dataSource.cloneWithRows(this.dataObj),
                isRefreshing:false
            });
            

        },(error)=>{
            console.error('网络错误:' + error);
            this.setState({
                // 一定要用dataSource的cloneWithXXXX来克隆数据源
                dataSource: this.state.dataSource.cloneWithRows([]),
                isRefreshing:false
            });
        })
    }

  render() {

    let starList = [];
    let {StarSubjectReducer} = this.props;
    console.log('StarSubjectGrid---',StarSubjectReducer);
    starList = StarSubjectReducer.starList;
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource.cloneWithRows(starList)}
          initialListSize={21}
          pageSize={3} // should be a multiple of the no. of visible cells per row
          scrollRenderAheadDistance={500}
          enableEmptySections={true}
          renderRow={this._renderRow}
          refreshControl={
            <RefreshControl
                  refreshing={StarSubjectReducer.isRefreshing}
                  onRefresh={this._onRefresh}
                  title="正在加载中…"
                  color="#ccc"
              />
          }
        />
      </View>
    );
  }

  //下拉刷新
  _onRefresh = () => {
    console.log('下拉刷新')
    // this.getNetData();
    let {dispatch} = this.props;
    dispatch(starSubjectAction(true,false));
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={this._pressRow} underlayColor="transparent">
            <Image source={rowData.specialPic ? {uri:rowData.specialPic} : require('../../images/placeholder_img.png')} style={styles.row} >
              <View style={styles.components}>
                <Text style={styles.name}>
                {rowData.name}
                </Text>
                <Image source={require('../../images/placeholder_img.png')} style={styles.pic} />
                <Text style={styles.name}>
                {rowData.cataId}
                </Text >
              </View>
            </Image>
      </TouchableHighlight>
    );
  }

  _pressRow(){
    console.log('cell 被点击了。。。')
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:64,
    backgroundColor:'black'
  },
  list: {
    backgroundColor:'black',    
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    padding: 0,
    margin: 3,
    width: (Constants.window.width - 30)/2,
    height: (Constants.window.width - 30)/2,
    backgroundColor: '#F6F66F',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#CCC'
  },
  components: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    marginBottom:0,
    alignSelf:'flex-end',
    backgroundColor:'rgba(0,0,0,0.5)',
    height:25,
  },
  name:{
    color:'white',
    alignSelf:'center'
  },
  pic:{
    alignSelf:'center',
    height:15,
    width:15,
  }
});

