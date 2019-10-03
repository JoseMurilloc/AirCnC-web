import React, { useState, useMemo} from 'react';

import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';


export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },
        [thumbnail]
    );

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: {user_id}
        })

        history.push('/dashboard')

    }
    return(
        <form onSubmit={handleSubmit}>
        {/* Label o */}
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select image" />
            </label>
        {/* Label 1 */}
            <label htmlFor="company">EMPRESA *</label> 
            <input 
                id="company"
                value={company}
                placeholder="Sua empresa increvel"
                onChange={event => setCompany(event.target.value)}
            />

        {/* Label 2 */}
            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por virgulas)</span></label>
            <input 
                id="techs"
                value={techs}
                placeholder="Quais tecnologias usam?"
                onChange={event => setTechs(event.target.value)}
            />

        {/* Label 3 */}
            <label htmlFor="price">VALOR DA DIARIA <span>(em branco para GRATUITO)</span></label>
            <input 
                id="price"
                value={price}
                placeholder="Valor cobrado por dia"
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    );
}