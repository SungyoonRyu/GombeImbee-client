export default function Tooltip({node}) {
    const title_limit = 30;
    const url_limit = 30;
    const info_limit = 30;

    function substr(limit, str) {
      return str.length > limit ? str.substr(0, limit) + '...' : str;
    }

    return(
      <div align='left'>
        <span>
          <p>
            제목: <br/>
            <span>
              { substr(title_limit, node.title) }
            </span>
          </p>
          <br/>
          <p>
            URL: <br/>
            <span>
              { substr(url_limit, node.url) }
            </span>
          </p>
          <br/>
          <p>
            태그: <br/>
            <span>
              { node.tags.map((tag) => {
                return(
                  <span key={tag.id}>
                    #{tag}&nbsp;
                  </span> 
                );
              })}
            </span>
          </p>
          <br/>
          <p>
            설명: <br/>
            <span>
              { substr(info_limit, node.info) }
            </span>
          </p>
        </span>
      </div>
    );
}