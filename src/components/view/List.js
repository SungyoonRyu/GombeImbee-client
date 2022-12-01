

export default function ListView(props) {
  if (props.activate) {
    return(
      <>
        {props.nodeData.groups.map((groupName) => {
          return (
            <div key={groupName}>
              <h2> {groupName} </h2>
              {props.nodeData.nodes.filter(node => node.group === groupName)
                .map((node) => {
                  return (
                    <p key={node.id}> 
                      <span style={{fontSize: '20px'}}> 
                        {node.title} 
                      </span>
                      <br/> {node.url}
                    </p>
                  );
                }
              )}
            </div>
          );
        })}
      </>
    );
  }
}