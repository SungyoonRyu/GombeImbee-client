

export default function ListView(props) {
  if (props.activate) {
    return(
      <>
        {props.nodeData.nodes.map((node) => {
          if (node.type == 'workspace') return null;
          else if (node.type == 'group') {
            return (
              <div key={node.id} style={{float: 'left'}}>
                {node.title}&nbsp;&nbsp;
              </div>
            );
          }
          return (
            <p key={node.id}> 
              <span style={{fontSize: '20px'}}> 
                {node.title} 
              </span>
              <br/> {node.url}
            </p>
          );
        })}  
      </>
    );
  }
}