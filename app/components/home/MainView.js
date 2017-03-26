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
  Dimensions,
  RefreshControl,
  Image,
  ActivityIndicatorIOS
} from 'react-native';

import Swiper from 'react-native-swiper';
import Icon  from 'react-native-vector-icons/Ionicons';

import Constants from '../../common/constants'
import NetUtil from '../../common/NetUtil'
import Loading from '../../custom/Loading'
import {mainViewAction} from '../../actions/MainViewAction';

import VideoListDetail from './VideoListDetail'
import StarSubjectGrid from './StarSubjectGrid'
import StarSubjectContainer from '../../containers/StarSubjectContainer'


// const urlStr = 'http://appapi.miidol.com:85/api.php?m=videos&c=index&a=homeData'
// const urlStr = 'http://food.boohee.com/fb/v1/feeds?page=0&per=10'

export default class MainView extends Component{
  constructor(props) {
    super(props);

    this.bannerList = [];

    var ds = new ListView.DataSource({
        getRowData: (dataSource, sectionID, rowID) => {
            return dataSource[sectionID][rowID];
        },
        getSectionHeaderData: (dataSource, sectionID) => {
            return sectionID;
        },
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
    })

    this.state = {
        //初始化一个空数据源，记得设置enableEmptySections=true，不然在这个版本中会有警告
        dataSource: ds,
    };
  }

  componentDidMount(){
      console.log('componentDidMount')
      //数据请求
      InteractionManager.runAfterInteractions(() => {
        // this.getNetData();
        const {dispatch} = this.props;
        // console.log('componentDidMount---',dispatch)
        // 只有改业面第一次didMount的时候isLoading才为true，其他都为false
        dispatch(mainViewAction(false,true));
      });
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }
  
  getNetData(){
    //获取首页网络数据

    NetUtil.post(Constants.urlSet.Main, {}, (jasonData) => {
        //下面是请求下来的数据
        console.log(jasonData);
        //banner数据
        this.bannerList = jasonData.data.homeAdvPics
        console.log('********bannerList**********')
        console.log(this.bannerList)
        //最新、最热数据
        const listArr = jasonData.data.list; 

        /////***************************//////
        let dataSource = {};
        let sectionIDs = [];
        let rowIDs = []; 
        console.log('********listArr**********')
        console.log(listArr)
        for (let i = 0; i < listArr.length; i++) {
            let listItem = listArr[i];
            sectionIDs.push(listItem.jsonName)
            console.log('------- sectionIDs ---------')
            console.log(sectionIDs[i])
            let datasArr = listItem.datas;
            dataSource[listItem.jsonName] = datasArr;
            //创建一个二维数组的空子数组
            rowIDs[i] = [];
            for(let j = 0; j < datasArr.length; j++){
                row = datasArr[j];
                console.log('------- row.id ---------')
                console.log(j)
                rowIDs[i].push(j);
            }
        }

        console.log('********dataSource**********')
        console.log(dataSource)
        /////***************************//////
        this.setState({
            // 一定要用dataSource的cloneWithXXXX来克隆数据源
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataSource, sectionIDs, rowIDs),
            isRefreshing:false
        });

     },(error)=>{
        console.error('网络错误:' + error);
        this.setState({
            // 一定要用dataSource的cloneWithXXXX来克隆数据源
            dataSource: this.state.dataSource.cloneWithRowsAndSections({dataSource}, [], []),
            isRefreshing:false
        });
     })
  }

  render() {

    const {MainViewReducer} = this.props;
    console.log('~~~~MainView  render~~~~~~',MainViewReducer);

    //最新、最热数据
    let listArr = []; 
    if(typeof MainViewReducer !== 'undefined'){
        console.log('--panduan----',MainViewReducer.feedList)
        listArr = MainViewReducer.feedList;
        this.bannerList = MainViewReducer.homeAdvPicsList;
    }
    let dataSource = {};
    let sectionIDs = [];
    let rowIDs = []; 
    console.log('*****listArr*****',listArr)
    for (let i = 0; i < listArr.length; i++) {
        let listItem = listArr[i];
        sectionIDs.push(listItem.jsonName)

        let datasArr = listItem.datas;
        dataSource[listItem.jsonName] = datasArr;
        //创建一个二维数组的空子数组
        rowIDs[i] = [];
        for(let j = 0; j < datasArr.length; j++){
            row = datasArr[j];
            rowIDs[i].push(j);
        }
    }

    return (
        <View style={styles.container}> 
            <ListView 
                style={styles.listView}
                //dataSource={this.state.dataSource}
                dataSource={this.state.dataSource.cloneWithRowsAndSections(dataSource,sectionIDs,rowIDs)}
                //渲染表头
                renderHeader = {this._renderListHeader.bind(this)}
                // renderFooter = {this._renderListHeader.bind(this)}
                //渲染cell 
                renderRow={this._renderRow.bind(this)}
                //渲染组头
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                //允许组头为空
                enableEmptySections = {true}
                automaticallyAdjustContentInsets = {false}
                showsVerticalScrollIndicator = {true}
                // pagingEnabled = {false}
                //每次事件循环（每帧）渲染的行数，适当的设置可以优化性能。
                // pageSize = {5}
                // removeClippedSubviews={true} 
                //描述还有多少个像素就要滑到底部的时候会触发onEndReached回调方法，这样我们可以在滑到底部之前提前加载网络数据
                // onEndReachedThreshold = {100}   
                //滑动到“底部”的时候会被调用
                //onEndReached = {this._onUpRrefresh.bind(this)} 
                //控制列表能否滑动，默认为true  
                scrollEnabled={true}
                refreshControl={
                    <RefreshControl
                        refreshing={MainViewReducer.isRefreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        title="正在加载中…"
                        color="#ccc"
                    />
                }
            />
        </View>
    )
  }

  //表头
  _renderListHeader(){
    return(
        this.state.isRefreshing ? null :
        <View style = {[styles.listHeader]}>
            <Swiper
                height={200}
                loop={true}
                autoplay={true}
                dot={<View style={styles.customDot} />}
                activeDot={<View style={styles.customActiveDot} />}
                paginationStyle={{
                    bottom: 10
                }}
                backgroundColor='white'
            >
                    {this.bannerList.map((banner) => {
                        console.log("遍历banner数组");
                        return (
                            <TouchableOpacity key={banner.id} activeOpacity={0.75} onPress = {this._onBannerPress.bind(this)}>
                                <Image
                                    style={styles.bannerImage}
                                    source={{uri:banner.url}}
                                />
                            </TouchableOpacity>
                        )
                    })}
            </Swiper>

            <TouchableOpacity
                activeOpacity={0.75}
                onPress={this.starSubject.bind(this)}
                style = {[styles.starSubject]}
            >
                <Image style={{flex:1}} source={require('../../images/StarSubject@2x.png') } resizeMode = 'cover'/>
            </TouchableOpacity>

        </View>
        )
  }
  //广告条
  _onBannerPress(){
    console.log('广告条被点击了')
    alert('我是banner')
  }

  renderSectionHeader(sectionData, sectionID){
    console.log('我是section header');
    return(
        <View style = {styles.sectionHeader}>
            <View style={{height:1,width:90,backgroundColor:'white'}}></View>
            <Image source={require('../../images/biaoti@2x.png')} style={styles.visibleImg} />
            <Text style = {{textAlign:'center',color:'yellow'}}>{sectionData}</Text>
            <View style={{height:1,width:90,backgroundColor:'white'}}></View>
        </View>
    )
  }

  //cell
  _renderRow(rowData, sectionID, rowID) {

    return(
        <TouchableOpacity
            activeOpacity={0.75}
            onPress={this._cellPress.bind(this,rowData)}
            style={styles.cellContainer}
        >
            <View style={styles.cellItem}>
                {/**注意加载本地图片时用require */}
                <Image source={ rowData.titleImgPath ? {uri:rowData.titleImgPath} : require('../../images/placeholder_img.png')} style={styles.cellImg}>
                    {/*视频分类、视频标题*/}
                    <View style={styles.cellTitlePart}>
                        <Text  style={styles.videosType}>
                        {rowData.videosType === '2' ? 'VR' : ''}
                        </Text>
                        <Text  style={styles.cellTitle} numberOfLines={1}>
                        {rowData.title}
                        </Text>
                    </View>
                     {/*眼镜图标、视频观看数*/}
                     <View style={styles.visibleNumPart}>
                        <Image source={require('../../images/img_eye@3x.png')} style={styles.visibleImg} />
                        <Text  style={styles.visibleNum}>
                        {rowData.hitCount}
                        </Text>
                     </View>
                    
                </Image>
            </View>
        </TouchableOpacity>
    )
  }

  //明星专区
  starSubject(){
      console.log('明星专题');
      let {navigator,MainViewReducer,dispatch} = this.props;
      navigator.push({
        title: '明星专区',
        component: StarSubjectContainer
      })
  }

  //cell被点击了
  _cellPress(rowData){
      console.log('cell被点击了');
      //一定要在组件卸载的时候在componentWillUnmount函数中清除定时器，不然就会crash
      this.timer = setTimeout(
      () => { 
        //   alert('cell被点击了！');
            this.props.navigator.push({
                title: '视频详情页',
                component: VideoListDetail,
                passProps:{
                    rowData,
                }
            });
        },
        30 //单位是毫秒
      );
  }

  //下拉刷新
  _onRefresh(){
      console.log('下拉刷新中。。。。')
    //   this.getNetData();
      //数据请求
      InteractionManager.runAfterInteractions(() => {
        // this.getNetData();
        const {dispatch} = this.props;
        dispatch(mainViewAction(true,false));
      });
  }

  //上拉刷新
  _onUpRrefresh(){
      console.log('上拉刷新中。。。。')
    //   this.getNetData();
  }
}

//样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:64,
        // marginBottom:49,
        backgroundColor:'black'
    },
    listView:{
        flex:1,
        backgroundColor:'black',
        // height:Constants.window.height - 64 - 30,
    },
    listHeader:{
        height:255,
    },
    bannerImage:{
        height: 200,
        width: Constants.window.width,
        backgroundColor:'black'
    },
    starSubject:{
        flex:0,
        height:55,
        backgroundColor:'black'

    },
    sectionHeader:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center', 
        alignItems:'center',
        height:50,
        backgroundColor:'black'
    },
    cellContainer:{
        backgroundColor:'black',
    },
    cellItem:{
        height:140,
        marginBottom:4,
        //   backgroundColor:'#ee701a'
    },
    customDot: {
        backgroundColor: '#ccc',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    customActiveDot: {
        backgroundColor: '#ffd600',
        height: 1.5,
        width: 15,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    cellImg:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-end'
    },
    cellTitlePart:{
        flex:3,
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:10,
        // backgroundColor:'red'
    },
    videosType:{
        backgroundColor:'rgba(12,32,423,0)',
        alignSelf:'flex-end',
        marginLeft:10,
        color:'#ffd600'
    },
    cellTitle:{
        backgroundColor:'rgba(12,32,423,0)',
        alignSelf:'flex-end',
        marginLeft:5,
        fontSize:14,
        color:'white',
    },
    visibleNumPart:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginBottom:10,
        // backgroundColor:'yellow'
    },
    visibleImg:{
        backgroundColor:'rgba(12,32,423,0)',
        alignSelf:'center',
        marginRight:5
    },
    visibleNum:{
        backgroundColor:'rgba(12,32,423,0)',
        alignSelf:'flex-end',
        color:'#ffd600',
        marginRight:10,
    }
});