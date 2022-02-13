export default function TeamAnalysis({ data, exit }) {
  return (
    <div className="card data-card">
      <div className="card-body">
        <h3>
          {data.teamNumber}
          <svg
            onClick={() => {
              exit();
            }}
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
            ></path>
          </svg>
        </h3>
      </div>
      <form>
        <div className="data-group">
          <h5>Auto</h5>
          <div className="form-group">
            <label>taxi: {data.taxi}</label>
          </div>
          <div className="form-group">
            <label>balls in low: {data.autoLow}</label>
          </div>
          <div className="form-group">
            <label>balls in high: {data.autoHigh}</label>
          </div>
        </div>
        <div className="data-group">
          <h5>Telop</h5>
          <div className="form-group">
            <label>balls in low: {data.telopLow}</label>
          </div>
          <div className="form-group">
            <label>balls in high: {data.telopHigh}</label>
          </div>
          <div className="form-group">
            <label>level of climb: {data.climb}</label>
          </div>
        </div>
      </form>
    </div>
  );
}
