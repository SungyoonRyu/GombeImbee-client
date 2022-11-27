

export default function ListView(props) {
    const data = props.nodeData.nodes.map((node) => {
        return (
            <>
                <p> Id: {node.id} </p>
                <p> Title: {node.title} </p>
                <p> Group: {node.group} </p>
            </>
        );
    })

    if (props.activate) {
        return(
            <>
              {data}  
            </>
        );
    }
}