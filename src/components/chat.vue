<template>
  <div class="chat-bg">
    <div class="mahu-app">
      <div class="flex1">
        <img class="logo" src="../assets/logo128.png" alt="">
        <div class="text-wrap">
          <div class="title-text">麻花语音</div>
          <div class="text-desc">语音情感倾诉与互动社区</div>
        </div>
      </div>
      <div>
        <el-button class="go-app" round>打开APP</el-button>
      </div>

    </div>
    <div class="upset-wrap" @click="playUpset">
      <div class="audio">
        <img class="play" :src="playImg" alt="">
        <audio id="useraudio" ref="audioUpset" class="audio-hidden" :src="data.parentPost.resourceUrl">亲 您的浏览器不支持html5的audio标签</audio>
      </div>
      <div class="upset-desc">
        <div class="trai"></div>
        <div class="elisp-hidden elisp-hidden-row2">
          <span class="desc-title">烦恼：</span>
          {{data.parentPost.content}}
        </div>
      </div>
    </div>
    <div class="me-replay">
      <div class="replay-title">点击收听我的回复</div>
      <div class="audio-position">
        <div @click="playUpset1" class="audio-wrap">
          <div class="mask">
            <img class="mask-play" :src="playImg1" alt="">
          </div>
          <audio class="audio-hidden" ref="audioUpset1" id="useraudio1" :src="data1.subPost.resourceUrl">亲 您的浏览器不支持html5的audio标签</audio>
        </div>
        <div :class="['wave', { 'animate': animate }]">
          <div class="w1"></div>
          <div class="w2"></div>
          <div class="w3"></div>
        </div>
      </div>

      <div class="replay-desc">
        <div class="replay-text">
          <div class="trai1"></div>
          <div class=" elisp-hidden elisp-hidden-row3"> {{data1.subPost.content}}</div>
        </div>
      </div>
      <div class="replay-money">
        我帮人解决烦恼，已经赚了
        <span class="num">11</span> 元
      </div>
      <div class="agree-btn">
        <el-button class="agree-btn-inner" round> <img class="agree-btn-img" src="../assets/agree.png" alt=""> 支持Ta</el-button>
      </div>
    </div>
    <div class="agree-list">
      <div class="agree-item">
        <div class="agree-img"></div>
        <div class="agree-text">
          XXX 支持你，回复奖金提高
          <span class="agree-num">10</span>
          金币
        </div>
      </div>
      <div class="agree-item">
        <div class="agree-img"></div>
        <div class="agree-text">
          XXX 支持你，回复奖金提高
          <span class="agree-num">10</span>
          金币
        </div>
      </div>
    </div>
    <div class="replay-btn">
      <el-button class="join" round>参与回复赚零花钱</el-button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      data: {
        parentPost: {
          avatarUrl: String,
          nickName: String,
          resourceUrl: String,
          title: String,
          content: String
        }
      },
      data1: {
        subPost: {
          avatarUrl: String,
          nickName: String,
          resourceUrl: String,
          title: String,
          content: String
        }
      },
      playcon: true,
      playcon1: true,
      animate: false
    };
  },
  mounted() {
    this.getdata();
    this.listenuser("useraudio", this.playcon);
    this.listenuser("useraudio1", this.playcon1);
  },
  computed: {
    playImg: function() {
      return this.playcon
        ? require("../assets/play.png")
        : require("../assets/pause.png");
    },
    playImg1: function() {
      return this.playcon1
        ? require("../assets/play.png")
        : require("../assets/pause.png");
    }
  },
  methods: {
    playUpset: function() {
      if (!this.$refs.audioUpset.paused) {
        this.$refs.audioUpset.pause();
        this.playcon = this.$refs.audioUpset.paused;
      } else {
        this.$refs.audioUpset.play();
        this.playcon = this.$refs.audioUpset.paused;
      }
    },
    playUpset1: function() {
      if (!this.$refs.audioUpset1.paused) {
        this.$refs.audioUpset1.pause();
        this.playcon1 = this.$refs.audioUpset1.paused;
        this.animate = false;
      } else {
        this.$refs.audioUpset1.play();
        this.animate = true;
        this.playcon1 = this.$refs.audioUpset1.paused;
      }
    },
    listenuser(el, playcon, animate) {
      var audio;
      let that = this;
      audio = document.getElementById(el);
      audio.addEventListener("ended", function() {
        that[playcon] = true;
        if (this.animate) {
          this.animate = false;
        }
      });
    },
    getdata() {
      this.axios.get("api/getparentPost").then(res => {
        console.log(res);
        this.data = res.data;
        // this.listenuser();
        console.log(this.data);
      });
      this.axios.get("api/subPost").then(res => {
        console.log(res);
        this.data1 = res.data;

        console.log(this.data1);
      });
    }
  }
};
</script>
<style scoped>
@-webkit-keyframes opac {
  from {
    opacity: 1;
    width: 0;
    height: 0;
    top: 50%;
    left: 50%;
  }
  to {
    opacity: 0;
    width: 100%;
    height: 100%;
    top: -3px;
    left: -3px;
  }
}
.w1,
.w2,
.w3 {
  visibility: hidden;
}
.animate .w1{
	visibility:visible;
	-webkit-animation:opac 1.5s infinite;
}
.animate .w2{
	visibility:visible;
	-webkit-animation:opac 1.5s infinite;-webkit-animation-delay:.3s;
}
.animate .w3{
	visibility:visible;
	-webkit-animation:opac 1.5s infinite;-webkit-animation-delay:.6s;
}
.wave {
  width: 14rem;
  height: 14rem;
  position: absolute;
  left: calc(50% - 7rem);
  top: calc(50% - 7rem);
}
.wave * {
  border: 3px solid #fa4c16;
  position: absolute;
  border-radius: 50%;
}
.w4 {
  border-radius: 0;
  width: 20%;
  height: 20%;
  top: 35%;
  left: 40%;
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
}
.w4 {
  border-radius: 0;
  width: 20%;
  height: 20%;
  top: 35%;
  left: 40%;
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
}
.chat-bg {
  background: #f4f8fb;
  padding-top: 5.7rem;
  color: #4a4a4a;
  min-height: calc(100% - 5.7rem);
  position: absolute;
  padding-bottom: 2rem;
}
.mahu-app {
  position: fixed;
  left: 0;
  top: 0;
  width: calc(100% - 2rem);
  display: flex;
  justify-content: space-between;
  /* padding:  */
  background-color: #ffffff;
  padding: 10px;
  align-items: center;
  z-index: 10;
}

.flex1 {
  flex: 1;
  display: flex;
}
.logo {
  width: 3.3rem;
  height: 3.3rem;
  margin-right: 1rem;
}
.text-wrap {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: left;
}
.title-text {
  font-size: 1.5rem;
  color: #fa4c16;
}
.text-desc {
  font-size: 1.3rem;
  /* color:  */
}
.go-app {
  background-color: #fa4c16;
  color: #fff;
  padding: 10px 2.3rem;
}
.upset-wrap {
  padding: 2rem 1.3rem;
  display: flex;
}
.audio {
  width: 4.5rem;
  height: 4.5rem;
  display: flex;
  align-items: center;
  background-image: url("../assets/header.png");
  background-position: center;
  background-size: cover;
  margin-right: 2rem;
}
.play {
  width: 1.4rem;
  margin: 0 auto;
}
.upset-desc {
  position: relative;
  padding: 1rem;
  font-size: 1.4rem;
  line-height: 2rem;
  flex: 1;
  background-color: #ffffff;
}
.trai {
  position: absolute;
  top: 14px;
  left: -16px;
  font-size: 0;
  border: solid 8px;
  border-color: rgba(0, 0, 0, 0) #ffffff rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
}
.trai1 {
  position: absolute;
  top: -16px;
  left: 50%;
  margin-left: -4px;
  font-size: 0;
  border: solid 8px;
  border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #fafafa rgba(0, 0, 0, 0);
}
.desc-title {
  color: #fa4c16;
}
.me-replay {
  background-color: #ffffff;
  font-size: 1.4rem;
  line-height: 2rem;
}
.replay-title {
  font-size: 1.3rem;
  line-height: 3.5rem;
  text-align: center;
  color: #333333;
}
.audio-wrap {
  width: 8.8rem;
  height: 8.8rem;
  margin: 0 auto;
  background-image: url("../assets/header.png");
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 100;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  border-radius: 50%;
  align-items: center;
}
.mask-play {
  width: 2.3rem;
  height: 2.9rem;
  margin: 0 auto;
}
.replay-desc {
  /* background-color: #ffffff; */
  padding: 1rem 3rem;
  position: relative;
  z-index: 2;
}
.replay-text {
  padding: 1.5rem;
  border-radius: 0.8rem;
  background-color: #fafafa;
  color: #333;
  line-height: 2.2rem;
  font-size: 1.5rem;
  position: relative;
}
.replay-money {
  background-color: #faf8e1;
  color: #d18965;
  line-height: 3.7rem;
  text-align: center;
}
.num {
  color: #ff4965;
}
.agree-btn {
  padding: 1rem 0;
  text-align: center;
}
.agree-btn-inner {
  background-color: #32b755;
  color: 1.9rem;
  font-size: 1.9rem;
  color: #fff;
  padding: 1.2rem 5.6rem;
}
.agree-btn-img {
  width: 2.2rem;
  vertical-align: bottom;
}
.agree-list {
  padding: 1.3rem 2rem;
}
.agree-item {
  display: flex;
  margin-bottom: 1.3rem;
  align-items: center;
  font-size: 1.5rem;
  color: #333333;
}
.agree-img {
  width: 3.8rem;
  height: 3.8rem;
  background-image: url("../assets/header.png");
  background-position: center;
  background-size: cover;
  margin-right: 1rem;
}
.agree-num {
  color: #fe8e0b;
}
.audio-hidden {
  display: none;
}
.replay-btn {
  text-align: center;
}
.join {
  background-color: #fa4c16;
  color: #ffffff;
  font-size: 1.6rem;
  padding: 1.2rem 5rem;
}
.elisp-hidden {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;

  -webkit-box-orient: vertical;
}
.elisp-hidden-row2 {
  -webkit-line-clamp: 2;
}
.elisp-hidden-row3 {
  -webkit-line-clamp: 3;
}
.audio-position{
  position: relative;
  z-index: 3;
}
</style>

