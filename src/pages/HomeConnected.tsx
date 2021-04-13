import React, { FC } from 'react';

export const HomeConnected: FC = () => {
    return (
        <section className="masthead d-flex">
            <div className="container text-center my-auto">
                <h1 className="mb-1">Inventaire</h1>
                <h3 className="mb-5">
                    <em>Une facon simple d'organiser ses affaires</em>
                </h3>
                <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Find Out More</a>
            </div>
            <div className="overlay"></div>
        </section>
    );
}