Demo Link http://1.251.1.56/main?page=1  

# 1. Restful API  
Routing 파일이 comment, post, user로 줄어들었다.  
로그인의 경우 유저 정보를 받아오는 거니 GET아닌가 싶었으나 실제 로그인 구현시에는 세션이나 쿠키를 Response하는데, 이 세션, 쿠키들 (Resource) 를 생성한다는 의미겸 암호화겸 POST를 사용한다고 한다.  
또, Delete Post의 경우, postId만 queryParam으로 보내면 다른 사용자들도 postId만 알면 삭제할수 있으므로 post를 사용했다.  
실제 API 구현시에 Get 은 가져온다는 개념으로, Post 는 수행한다는 개념으로 두개만 사용하는 경우가 많다고 한다.
