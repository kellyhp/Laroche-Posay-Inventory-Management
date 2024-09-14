import React from 'react';
import styles from './Pagination.module.scss';

export default function Pagination({ currentPage, totalPages, handlePageChange }) {
    const createPagination = () => {
        let liTag = [];
        const beforePage = currentPage - 1;
        const afterPage = currentPage + 1;

        if(currentPage > 1){ 
            liTag.push(
                <li key="prev" className={`${styles.btn} ${styles.prev}`} onClick={() => handlePageChange(currentPage - 1)}>
                    <span><i className="fas fa-angle-left"></i> Prev</span>
                </li>
            );
        }

        if(currentPage > 2){
            liTag.push(
                <li key="first" className={`${styles.first} ${styles.numb}`} onClick={() => handlePageChange(1)}>
                    <span>1</span>
                </li>
            );
            if(currentPage > 3){ 
                liTag.push(<li key="dots1" className={styles.dots}><span>...</span></li>);
            }
        }

        for (let plength = beforePage; plength <= afterPage; plength++) {
            if (plength > totalPages) { 
                continue;
            }
            if (plength <= 0) { 
                continue;
            }
            let active = (currentPage === plength) ? styles.active : '';
            liTag.push(
                <li key={plength} className={`${styles.numb} ${active}`} onClick={() => handlePageChange(plength)}>
                    <span>{plength}</span>
                </li>
            );
        }

        if(currentPage < totalPages - 1){ 
            if(currentPage < totalPages - 2){ 
                liTag.push(<li key="dots2" className={styles.dots}><span>...</span></li>);
            }
            liTag.push(
                <li key="last" className={`${styles.last} ${styles.numb}`} onClick={() => handlePageChange(totalPages)}>
                    <span>{totalPages}</span>
                </li>
            );
        }

        if (currentPage < totalPages) { 
            liTag.push(
                <li key="next" className={`${styles.btn} ${styles.next}`} onClick={() => handlePageChange(currentPage + 1)}>
                    <span>Next <i className="fas fa-angle-right"></i></span>
                </li>
            );
        }
        return liTag;
    };

    return (
        <div className={styles.pagination} >
            <ul>
                {createPagination()}
            </ul>
        </div>
    );
}