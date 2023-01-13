import React from 'react'

import NavDropdown from 'react-bootstrap/NavDropdown'
import { useTranslation } from 'react-i18next'
export default function Language() {
    const { t, i18n } = useTranslation()
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <NavDropdown title={i18n.language === 'vi' ? 'Viet Nam' : 'English'} id="languages" className='languages'>
            <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>

            <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Viet Nam</NavDropdown.Item>

        </NavDropdown>
    )
}
