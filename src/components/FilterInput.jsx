const FilterInput  = ({filter,onFilterChnage}) =>
{
    return(
        <div className="filter">
            <input type="text" 
            placeholder="Filter by name or symbol..."
            value={filter}
            onChange={(e) => onFilterChnage(e.target.value)}/>
        </div>
    )
}

export default FilterInput;