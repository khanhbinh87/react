import ReactPaginate from "react-paginate";

export default function TableUserPaginate(props) {
    const { listUser,
        handleUpdateUser,
        handleViewUser,
        handleDeleteUser,
        pageCount,
        fetchAllUserPaginate,
       
        setCurrentPage
    } = props
    const handlePageClick = (event) => {
        fetchAllUserPaginate(+event.selected + 1)
        setCurrentPage(+event.selected + 1)

      
    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>

                    {
                        listUser && listUser.length > 0 && listUser.map((item, index) => {
                            return (
                                <tr key={`table users - ${index}`}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.email}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button
                                            className='btn btn-secondary'
                                            onClick={() => handleViewUser(item)}
                                        >View</button>
                                        <button
                                            className='btn btn-warning mx-2'
                                            onClick={() => handleUpdateUser(item)}
                                        >Update</button>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => handleDeleteUser(item)}

                                        >Delete</button>
                                    </td>
                                </tr>)
                        })
                    }
                    {
                        listUser && listUser.length === 0 &&
                        <tr>
                            <th colSpan={'4'}>Not found data</th>

                        </tr>

                    }
                </tbody>

            </table>
            <div className="d-flex justify-content-center align-items-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    // forcePage={currentPage  - 1}
                />
            </div>
        </>
    )
}
