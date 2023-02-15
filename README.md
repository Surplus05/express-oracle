Demo Link http://1.251.1.56/main?page=1  

# 1. Restful API  
Routing 파일이 comment, post, user로 줄어들었다.  
로그인의 경우 유저 정보를 받아오는 거니 GET아닌가 싶었으나 실제 로그인 구현시에는 세션이나 쿠키를 Response하는데, 이 세션, 쿠키들 (Resource) 를 생성한다는 의미겸 암호화겸 POST를 사용한다고 한다.  
또, Delete Post의 경우, postId만 queryParam으로 보내면 다른 사용자들도 postId만 알면 삭제할수 있으므로 post를 사용했다.  
실제 API 구현시에 Get 은 가져온다는 개념으로, Post 는 수행한다는 개념으로 두개만 사용하는 경우가 많다고 한다.
  
# 2. 최적화
![image](https://user-images.githubusercontent.com/104773096/219130144-1808d92f-6df2-4ef2-8f6c-628fed17853a.png)
로고 이미지와 폰트 로딩에 시간이 꽤 걸렸다.  
폰트의 경우 index.html -> css file -> font file (cdn) 한단계를 더 거쳐 시간이 많이 걸렸던것 같다.  
로고와 font-face css 파일을 외부에서 받아와 사용하는것이 아니라 페이지와 same origin으로 두고, font의 경우 preload 되게 하였다.  
또, body 에 transition 을 삭제했다.  
![image](https://user-images.githubusercontent.com/104773096/219139060-c5f17f0a-a65b-4389-85a8-1d36c8733813.png)
아까보단 훨씬 낫다.  
clinet 볼륨이 커지면 트리 쉐이킹이나 이미지 스프라이트 작업같은것도 해보고 싶다.  
