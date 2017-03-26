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
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import Video from 'react-native-video'
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';

import Constants from '../../common/constants'
import NetUtil from '../../common/NetUtil'

import VideoListDetailCell from './VideoListDetailCell'
import VideoListDetailCell1 from './VideoListDetailCell1'
import VideoListDetailCell2 from './VideoListDetailCell2'
import VideoListDetailCell3 from './VideoListDetailCell3'
import VideoListDetailCell4 from './VideoListDetailCell4'



export default class VideoListDetail extends Component{

  constructor(props){
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
        //初始化一个空数据源，记得设置enableEmptySections=true，不然在这个版本中会有警告
        dataSource: ds.cloneWithRows(['0','1','2','3','4','5','6','7','8','9','10','11','12']),
        isRefreshing:false,
        paused:true,
        volume:1.0,
    };
    // console.log(this.props.rowData)
    // console.log(this.props.rowData.titleImgPath)
  }

  render() {
    let {rowData} = this.props
    return (
      <View style={styles.container}>
        {/*头部*/}
        <View style={styles.headerBG}>
            <Video source={{uri: 'http://ok45q1s8t.bkt.clouddn.com/broadchurch.mp4'}}   // Can be a URL or a local file.
              ref={(ref) => {
                this.player = ref
              }}                             // Store reference
              rate={1.0}                     // 0 is paused, 1 is normal.
              volume={this.state.volume}                   // 0 is muted, 1 is normal.
              muted={false}                  // Mutes the audio entirely.
              paused={this.state.paused}     // Pauses playback entirely.
              resizeMode="cover"             // Fill the whole screen at aspect ratio.
              repeat={true}                  // Repeat forever.
              playInBackground={false}       // Audio continues to play when app entering background.
              playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
              progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
              onLoadStart={this.loadStart}   // Callback when video starts to load
              onLoad={this.setDuration}      // Callback when video loads
              onProgress={this.setTime}      // Callback every ~250ms with currentTime
              onEnd={this.onEnd}             // Callback when playback finishes
              onError={this.videoError}      // Callback when video cannot be loaded
              onBuffer={this.onBuffer}       // Callback when remote video is buffering
              style={styles.backgroundVideo} />
              <View style={styles.playBtnContainer} >
              <TouchableOpacity
                style={styles.playBtn}
                onPress={() => {
                  console.log("onLongPress")
                  this.setState({
                    paused:!this.state.paused,
                  })
                }}
                >
                <Image
                  style={styles.playBtn}
                  source={this.state.paused ? require('../../images/pause.png') : require('../../images/开始.png') } />
              </TouchableOpacity> 
          </View>
          <View style={styles.componentsContainer}>
              <View style={styles.leftComponentsContainer}>
                  <Image  source={require('../../images/评论2.png')} style={styles.img}/>
                  <Text style={styles.text}>123</Text>
                  <Image source={require('../../images/收藏.png')} style={styles.img}/>
                  <Text style={styles.text}>212</Text>                    
              </View>
              <View style={styles.rightComponentsContainer}>
                  <Image  source={require('../../images/未下载.png')}/>
                  <Image  source={require('../../images/Shape.png')}/>
                  <Image  source={require('../../images/收藏.png')}/>
                  <Image  source={require('../../images/分享.png')}/>
              </View>
          </View>
        </View>
        {/*评论列表部分*/}
        <View style={styles.listContainer}>
            <ListView 
              keyboardShouldPersistTaps={true}
              style={styles.listView}
              renderScrollComponent={(props) => <PullRefreshScrollView style={{backgroundColor:'black',color:'purple'}} onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} useLoadMore={1}{...props}     />}              
              dataSource={this.state.dataSource}
              //渲染cell 
              renderRow={this._renderRow.bind(this)}
              //允许组头为空
              enableEmptySections = {true}
              automaticallyAdjustContentInsets = {false}
              showsVerticalScrollIndicator = {true}
              // refreshControl={
              //     <RefreshControl
              //         refreshing={this.state.isRefreshing}
              //         onRefresh={this._onRefresh}
              //         title="正在加载中…"
              //         color="#ccc"
              //     />
              // }
            />
        </View>
      </View>
    );
  }
  //下拉刷新
  onRefresh(PullRefresh){
    console.log('下拉刷新')
    PullRefresh.onRefreshEnd();
  }
  //上啦刷新
  onLoadMore(PullRefresh) {
    console.log('上拉刷新')    
    PullRefresh.onLoadMoreEnd();
  }
  // Callback when video starts to load
  loadStart(){
    console.log('视频开始加载');
  }
  // Callback when video loads
  setDuration(){
    console.log('视频在加载中。。。');    
  }
  // Callback every ~250ms with currentTime
  setTime(){
    console.log('视频在加载总。。250/ms'); 
  }    
  // Callback when playback finishes
  onEnd(){
    console.log('视频播放完成'); 
  }
  // Callback when video cannot be loaded         
  videoError(){
    console.log('视频加载失败。。。')
  }
  // Callback when remote video is buffering
  onBuffer(){

  }      
  // Callback when remote video is buffering    
  onBuffer(){
    console.log('视频在缓存中。。。')
  }      

  //播放视频按钮
  playBtn(){
    console.log('播放视频')
    this.setState({
      paused:false,
    })
  }

  //返回cell
  _renderRow(rowData,rowID,rowIdentifier){
      console.log(rowID + '~~~~~~~~' + rowIdentifier)
      switch (parseInt(rowIdentifier)) {
            case 0:
                return (
                        <VideoListDetailCell1 />
                );
            case 1:
                return (
                        <VideoListDetailCell2 />
                );
            case 2:
                return (
                        <VideoListDetailCell3 />
                );
            case 3:
                return (
                        <VideoListDetailCell3 />
                );
            case 4:
                return (
                        <VideoListDetailCell4 />
                );
               
            default:
                return (
                    <VideoListDetailCell />
                );;
      }
  }

  _onRefresh(){
    console.log('刷新评论')
  }

  componentDidMount() {
    console.log('~~~~~~~componentDidMount~~~~~~~')
    // this.getNetData();
  }
  

  getNetData(){
    //获取首页网络数据
    let params = {
      vId:this.props.rowData.vId,
      cataId:this.props.rowData.cataId
    }
    NetUtil.post(Constants.urlSet.GetDetailVideo, params, (jasonData) => {
        //下面是请求下来的数据
        console.log('~~~~~~视频详情页数据~~~~~~~~~');
        console.log(jasonData);
        this.setState({
            // 一定要用dataSource的cloneWithXXXX来克隆数据源
            // dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            // isRefreshing:false
        });

     },(error)=>{
        console.error('网络错误:' + error);
        this.setState({
            // 一定要用dataSource的cloneWithXXXX来克隆数据源
            // dataSource: this.state.dataSource.cloneWithRowsAndSections({dataBlob}, [], []),
            // isRefreshing:false
        });
     })
  }
}

//样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'black',
    marginTop:64,
  },
  headerBG:{
    width:Constants.window.width,
    height:230,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex:1,
  },
  playBtnContainer:{
    flex:1,
    // height:218,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'rgba(0,0,0,0)',
  },
  leftComponentsContainer:{
    flex:2,
    flexDirection:'row',
    alignItems:'center',
    // backgroundColor:'yellow'
  },
  text:{
    color:'white',
    marginLeft:6,
  },
  img:{
    marginLeft:15,
  },
  rightComponentsContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',  
    justifyContent:'space-around'  
  },
  playBtn:{
    height:50,
    width:50,
    backgroundColor:'rgba(11,11,11,0)'
  },
  componentsContainer:{
    flexDirection:'row',
    height:30,
    marginBottom:0,
    backgroundColor:'rgba(0,0,0,0.7)',
  },
  listContainer: {
    flex: 1.4,
    width:Constants.window.width,
    // backgroundColor:'red'
  },
  listView:{
    backgroundColor:'white'
  },
  cellItem:{
    backgroundColor:'white',
    height:60,
  },
});