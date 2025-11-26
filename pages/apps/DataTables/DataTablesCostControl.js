

import dynamic from "next/dynamic";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useTable,useGlobalFilter,useSortBy,usePagination } from "react-table";


export const GlobalFilterCostControl = ({ filter, setFilter }) => {
	return (
		<span className="d-flex ms-auto">
			<input
				value={filter || ""}
				onChange={(e) => setFilter(e.target.value)}
				className="form-control mb-4"
				placeholder="Search..."
			/>
		</span>
	);
};

const BasicTableCostControl = ({column, datatable}) => {
	const tableInstance = useTable(
		{
			columns: column,
			data: datatable,
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const {
		getTableProps, // table props from react-table
		headerGroups, // headerGroups, if your table has groupings
		getTableBodyProps, // table body props from react-table
		prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
		state,
		setGlobalFilter,
		page, // use, page or rows
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		gotoPage,
		pageCount,
		setPageSize,
	} = tableInstance;

	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<>
			<div className="d-flex">
				<select
					className=" mb-4 selectpage border me-1"
					value={pageSize}
					onChange={(e) => setPageSize(Number(e.target.value))}
				>
					{[10, 25, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
				<GlobalFilterCostControl filter={globalFilter} setFilter={setGlobalFilter} />
			</div>
			<table
				{...getTableProps()}
				className="table table-hover mb-0 table-bordered"
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									className={column.className}
									key={Math.random()}
								>
									<Fragment key={Math.random()}>
										<span className="tabletitle">{column.render("Header")}</span>
										<span>
											{column.isSorted ? (
												column.isSortedDesc ? (
													<i className="fa fa-angle-down  float-end"></i>
												) : (
													<i className="fa fa-angle-up float-end"></i>
												)
											) : (
												""
											)}
										</span>
									</Fragment>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()} key={Math.random()}>
								{row.cells.map((cell) => {
									return (
										<td
											className="borderrigth"
											{...cell.getCellProps()}
											key={Math.random()}
										>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="d-block d-sm-flex mt-4 ">
				<span className="">
					Showing 1 to {pageSize} of {datatable.length}

				</span>
				<span className="ms-sm-auto ">
					<Button
						variant=""
						className="btn-outline-light tablebutton me-2 d-sm-inline d-block my-1"
						onClick={() => gotoPage(0)}
						disabled={!canPreviousPage}
					>
						{" Previous "}
					</Button>
					<Button
						variant=""
						className="btn-outline-light tablebutton me-2 my-1"
						onClick={() => {
							previousPage();
						}}
						disabled={!canPreviousPage}
					>
						{" << "}
					</Button>
					<Button
						variant=""
						className="btn-outline-light tablebutton me-2 my-1"
						onClick={() => {
							previousPage();
						}}
						disabled={!canPreviousPage}
					>
						{" < "}
					</Button>
					<Button
						variant=""
						className="btn-outline-light tablebutton me-2 my-1"
						onClick={() => {
							nextPage();
						}}
						disabled={!canNextPage}
					>
						{" > "}
					</Button>
					<Button
						variant=""
						className="btn-outline-light tablebutton me-2 my-1"
						onClick={() => {
							nextPage();
						}}
						disabled={!canNextPage}
					>
						{" >> "}
					</Button>
					<Button
						variant=""
						className="btn-outline-light tablebutton me-2 d-sm-inline d-block my-1"
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						{" Next "}
					</Button>
				</span>
			</div>
		</>
	);
};


export default dynamic(() => Promise.resolve(BasicTableCostControl), { ssr: false });
