import { Link } from "react-router-dom";

function QuestionCard(props) {

  let statusSymbol = "";

  if (props.status === "easy") {
    statusSymbol = "✓";
  }

  else if (props.status === "medium") {
    statusSymbol = "•";
  }

  else if (props.status === "hard") {
    statusSymbol = "✗";
  }

  const linkPath = // page selection
    props.type === "notes"
      ? `/notes/${props.id}`
      : `/problem/${props.id}`;

  return (
    <div>
      <h2>

        {props.type === "notes" && ( // conditionla rendering
          <button onClick={() =>props.onStatusClick(props.id)}>{statusSymbol}</button>
        )}
        {/* delete button */}
        {props.onDelete && (
          <button
            onClick={() => props.onDelete(props.id)}
          >
          Delete
          </button>
        )}
        <Link
          to={linkPath}
          style={{
            color: "black",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {props.id} - {props.title}
        </Link>
        {props.type === "notes" && (
          <div>

            <p>
              Revisions: {props.revisionCount}
            </p>

            <p>
              Last Revised: {
                props.lastRevised || "Never"
              }
            </p>
            <div>

              <button
                onClick={() =>
                  props.onRevisionDecrease(
                    props.id
                  )
                }
              >
              -
              </button>

              <button
                onClick={() =>
                  props.onRevisionIncrease(
                    props.id
                  )
                }
              >
              +
              </button>

            </div>
          </div>    
        )}
      </h2>
    </div>
  );
}

export default QuestionCard;