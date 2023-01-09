import React from "react";
import { useState } from "react";
import Header from "../component/Header"


const Intro = () => {

    return(<>
    <Header now='overview-active'></Header>
    <div className="page">
        저도 블로그 하는 사람입니다. <br />
        그리고 이런 걸 원해서 블로그를 시작했습니다. <br /><br />

<b>1. 좋은 글을 써서<br />
2. 많은 사람이 제 글을 봐주는 것<br /><br /></b>

여러 정보를 공부해서 1번을 해내도 2번이 이뤄지기 힘들더라고요.<br /><br />

그 과정 속에서 늘 저격한 키워드를 검색하고,<br />
상위노출이 됐는지 늘 확인했습니다.<br /><br />

그러나, 매일 일일이 확인 상위노출을 확인하는 과정은 <br /> 그닥 저에게 좋지 않았습니다.<br /><br />

<b>1. 번거롭고, 귀찮습니다.<br />
2. 노출 결과에 따라, 그날 하루의 기분이 결정됩니다.<br /><br /></b>

아무래도 시간을 들여서 검색을 해보기 때문에, 더 의미부여가 된 것 같습니다. 마치 주식을 늘 확인하는 것처럼요.<br /><br /><br />

그래서 자동으로 정리해주는 사이트를 만들었습니다.<br /><br />

    </div>
    </>)
}

export default Intro;