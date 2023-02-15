Demo Link http://1.251.1.56/main?page=1  

# 1. 개발환경
## DBMS
Oracle Database 21c Express Edition Release 21.0.0.0.0  
Oracle Sql Developer 22.2.1  
  
## API Server
ExpressJS 4.18.2  
Node-OracleDB 5.5 (https://node-oracledb.readthedocs.io/en/latest/index.html)  
Oracle Instant Client 21.9  
TS-Node 10.9.1  
Nodemon 2.0.20  

## Front-End
ReactJS 18.2  
Redux toolkit 1.9.2  
Redux-persist 6.0  
React-router 6.8  
Axois 1.3.2  
Styled-Components 5.3.6  
  
		
# 2. DB 스키마
![image](https://user-images.githubusercontent.com/104773096/218503463-0b8147eb-3e3d-42e2-ad36-a71686a139c1.png)
				
# 3. 구현중 맞이한 문제점들
## A. ROWNUM  
원하는 페이지의 만큼의 POST 정보를 받아오고 싶었다.  
POST_ID 로 내림차순 정렬한 후 _총 POST - (PAGE-1 * 페이지당 POST수)_ 에서부터 페이지당 POST수 만큼을 받아오면 된다고 생각했다.  
LIMIT 의 각 값으로 지정해주면 되겠구나 했으나 Oracle 의 경우 LIMIT 이 존재하지 않았다.  
그래서 살펴본게 ROWNUM 이다.    
처음에 ROWNUM 사용했었는데, SELECT 결과를 1부터 COUNT 하기 때문에 BETWEEN 을 적용할 수 없었다.  
찾아보니 여러 윈도우 함수와 SQL 함수들이 존재했는데 그 중 ROW_NUMBER() 를 사용한 글이 있어 따라 구현했다.  
※ ROW_NUMBER() 를 사용해 구현했으나, 더 찾아보니 ROWNUM 을 예약어로 설정하면 메인쿼리에서 BETWEEN 을 사용할 수 있다고 한다.  
		
## B. CORS  
처음 CORS에러를 접하고, 헤더의 Access-Control-Allow-Origin 에 로컬 주소를 추가해 Response를 보내주었다.  
여전히 에러가 발생하였고, 찾아보니 Content-Type 이 application/json 인 경우에는 Simple Reqeust 조건을 만족시키지 않아서 Preflight 를 먼저 보내는데, Preflight Response를 제대로 주지 않아서 발생한다고 한다.
Access-Control-Allow-Methods 에 OPTIONS 를 포함시켜 Preflight 를 처리할 수 있도록 했어도 여전히 에러가 발생했다.  
임시 방편으로 JSON.Stringify 후 text/plain 타입으로 API 서버에 주고, 서버에서 JSON.Parse 후 사용하도록 했다.  
※ 글 적으며 찾아보니, Preflight 의 경우 다른 처리와 추가적인 데이터 없이 2xx 만 보내야 한다고 한다.   
※ 저렇게 해도 오류가 발생해서 더 찾아보다, 미들웨어 함수로 처리해주었는데, 제대로 작동했다..  
```javascript
app.use(function (req, res, next) {
  const origin = req.headers.origin as string;
  if (whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    res.sendStatus(404);
    return;
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});
```
※ 지금껏 라우팅 콜백 내부에서 처리해줬는데 여기서는 진짜 DB로직만 처리해주고, 나머지 처리는 미들웨어에서 해 주자.

## C. HTTPS  
처음에는 Github Pages를 이용해서 배포했었다.  
그러나 Github Pages 는 강제로 HTTPS 가 적용되고, HTTPS에서 HTTP호출시 Mixed Content 라며 차단시켜 버린다.  
API Server 에 HTTPS 를 적용시켰으나 ERR_CERT_INVALID 오류가 계속해서 발생했다.  
인증서를 받기위해 CertBot 으로 시도했으나 standalone, webroot 둘다 실패하며 인증서 발급을 받지 못했다.  
Github Pages 말고 직접 배포하기로 했고, Nginx를 선택했다.  

# 4. Restful API
Restful API 설계 시 URI로 Resource 를 명시하고, HTTP Method 를 통해 CRUD Operation을 적용해야 한다.  
이 프로젝트에서는 백엔드 경험과 배포에 초점을 맞추었기 때문에 복사 붙여넣기 편하게 Restful 하지 않게 구현하였다.  

삭제하는 경우를 예를 들어 보자.  
게시글 삭제 요청시 Request 헤더는 다음과 같다.  
```
GET http://host/delete (x)
```  
URL 에는 동사(행위)가 오면 안되고, 명사(대상, Resource)을 명시해야 한다.  
Restful 하게 바꾸어 보면
```
DELETE http://host/post (o)
```  
가 되어야 하는 것이다.  
어느정도 익숙해 졌으니 다음부터는 Restful 하게 API를 설계하자.  

# 5. 성능 최적화와 Restful API  
다른 branch 로 분리해 성능 최적화와 Restful API 로 리팩토링을 해 보자.  

# 6. 마치며  
얻어가는게 꽤 많았다.  
개발부터 배포까지 기초적인 수준이지만 해보면서 전체적인 흐름을 알게 됐다.  
다음에는 최초는 서버사이드에서 렌더링 한 결과를 보내주고 그 다음엔 클라이언트에서 렌더링해주는 방식으로 SSR, CSR(SPA) 의 장점을 합친 Next.js 를 이용해서 SSR 을 한번 해보고 싶다.  
또, Top Loading Bar 도 한번 만들어보고 싶다.  








