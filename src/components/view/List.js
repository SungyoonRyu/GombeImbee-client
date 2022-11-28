

export default function ListView(props) {
  if (props.activate) {
    return(
      <>
        {props.nodeData.nodes.map((node) => {
          return (
            <p key={node.id}> 
              Title: {node.title}
              <br/>
              Group: {node.group}
            </p>
          );
        })}  
      </>
    );
  }
}