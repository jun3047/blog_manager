import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Result = ({title, keywords, id, data, setData}) => {

    const navigate = useNavigate();

    return(
        <div className="result" onClick={()=>{
                goDetailPage(id, data, navigate)
            }}>
            <div className="del" onClick={(e)=>{
                e.stopPropagation();
                delNowList(id,data,setData);
                delDBList(id);
            }}>X</div>
            <h4>제목</h4>
            <div className="result-title">{title}</div>
            <h4>검색어</h4>
            <div className="result-keyword">
            {
                keywords.map(keyword=>
                    keyword + ', '
                )
            }
            </div>
        </div>
    )
}

const goDetailPage = ({id, data, navigate}) => {
  var temp = data.filter((e)=> e._id === id)[0]
  navigate('/detail/' + id, {state: {data: temp}})
}

const delNowList = ({id, data, setData}) => {
  var temp = data.filter((e)=> e._id !== id)
  setData(temp)
}

const delDBList = ({id}) => {
  axios
    .delete("/list", { data: { _id: id } })
    .then(() => {
      console.log("성공");
    })
    .catch((err, result) => {
      if (err) return err;
      console.error(err);
    });
}

export default Result;