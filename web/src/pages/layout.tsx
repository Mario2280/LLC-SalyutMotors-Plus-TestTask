import Link from 'next/link'
import { useState } from 'react'
import { v4 } from 'uuid'
type Props = {
	children: JSX.Element | JSX.Element[]
}
export default function Layout({ children }: Props) {
	const [curBtnPageOffset, setCurBtnPageOffset] = useState(1)
	const [curPage, setCurPage] = useState(1)

	let rows = []
	rows.push(
		<li className="page-item" key={v4()}>
			<Link
				className="page-link"
				href="#"
				aria-label="Previous"
				onClick={() => {
					setCurBtnPageOffset(curBtnPageOffset - 10 <= 0 ? 1 : curBtnPageOffset - 10)
				}}>
				<span aria-hidden="true">&laquo;</span>
			</Link>
		</li>
	)
	rows.push(
		<li className="page-item" key={v4()}>
			<Link
				className="page-link"
				href="#"
				aria-label="Prev-1"
				onClick={() => {
					setCurBtnPageOffset(curBtnPageOffset - 1 > 0 ? curBtnPageOffset - 1 : curBtnPageOffset)
				}}>
				<span aria-hidden="true">&lsaquo;</span>
			</Link>
		</li>
	)
	for (let i = curBtnPageOffset; i < curBtnPageOffset + 10; i++) {
		rows.push(
			<li className="page-item" key={v4()}>
				<Link
					className="page-link"
					href={`/users/${i}`}
					onClick={(e) => {
						setCurBtnPageOffset(parseInt((e.target as HTMLElement).innerText))
						console.log(parseInt((e.target as HTMLElement).innerText))
						setCurPage(parseInt((e.target as HTMLElement).innerText))
					}}>
					{i}
				</Link>
			</li>
		)
	}
	rows.push(
		<li className="page-item" key={v4()}>
			<Link
				className="page-link"
				href="#"
				aria-label="Next+1"
				onClick={() =>
					setCurBtnPageOffset(curBtnPageOffset + 1 <= 241 ? curBtnPageOffset + 1 : curBtnPageOffset)
				}>
				<span aria-hidden="true">&rsaquo;</span>
			</Link>
		</li>
	)
	rows.push(
		<li className="page-item" key={v4()}>
			<Link
				className="page-link"
				href="#"
				aria-label="Next"
				onClick={() => {
					setCurBtnPageOffset(
						curBtnPageOffset + 20 <= 251 ? curBtnPageOffset + 10 : curBtnPageOffset
					)
				}}>
				<span aria-hidden="true">&raquo;</span>
			</Link>
		</li>
	)

	return (
		<>
			<h1 className={'mb-5'}>Пользователи</h1>
			<div className="d-flex justify-content-center">
				<nav aria-label="Page navigation example">
					<ul className="pagination">{...rows}</ul>
				</nav>
			</div>

			{children}
		</>
	)
}
