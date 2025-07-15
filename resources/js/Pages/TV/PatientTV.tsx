import { PatientAdmissions } from '@/types/Admissions';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const PatientTV: React.FC = () => {
    const { props } = usePage();
    const gender = props.gender as 'm' | 'f';

    const [patients, setPatients] = useState<PatientAdmissions[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    const getCardsCount = () => {
        const params = new URLSearchParams(window.location.search);
        return Math.min(
            Math.max(parseInt(params.get('cards') || '6', 10), 1),
            12,
        );
    };

    const getSpeed = () => {
        const params = new URLSearchParams(window.location.search);
        return Math.max(parseInt(params.get('speed') || '5000', 10), 1000);
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(
                    `/api/patients/admitted?gender=${gender}`,
                );
                setPatients(
                    response.data.map((patient: PatientAdmissions) => ({
                        ...patient,
                        lastAdmission: patient.admissions?.[0],
                    })),
                );
            } catch (error) {
                console.error('Erro ao carregar pacientes', error);
            }
        };

        fetchPatients();
    }, [gender]);

    /** 🔹 WebSocket recebe apenas eventos do gênero correto */
    useEffect(() => {
        const channel = window.Echo.channel('admissions');
        channel.listen('.PatientAdmitted', (e: PatientAdmissions) => {
            if (e.gender === gender) {
                console.log('Evento PatientAdmitted recebido:', e);
                setPatients((prev) => [...prev, e]);
            }
        });

        return () => {
            channel.stopListening('.PatientAdmitted');
        };
    }, [gender]);

    /** 🔹 Controle de mudança de página */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prevPage) =>
                prevPage + 1 >= Math.ceil(patients.length / getCardsCount())
                    ? 0
                    : prevPage + 1,
            );
        }, getSpeed());

        return () => clearInterval(interval);
    }, [patients]);

    const cardsCount = getCardsCount();
    const displayedPatients = patients.slice(
        currentPage * cardsCount,
        (currentPage + 1) * cardsCount,
    );

    return (
        <>
            <Head title={gender === 'f' ? 'TV - Feminino' : 'TV - Masculino'} />
            <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-indigo-400 to-cyan-400">
                <main className="container mx-auto px-6 py-8">
                    <div
                        key={currentPage}
                        className="grid animate-fadeIn grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
                    >
                        {displayedPatients.map((patient) => {
                            // Se o valor de patient.photo não começar com '/', prefixe com "/storage/"
                            const photoUrl =
                                patient.photo && patient.photo.startsWith('/')
                                    ? patient.photo
                                    : `/${patient.photo}`;

                            return (
                                <motion.div
                                    layout
                                    key={patient.id}
                                    className="flex overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-500 ease-in-out"
                                >
                                    <div className="w-1/2">
                                        <img
                                            src={photoUrl}
                                            alt={patient.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex w-1/2 flex-col justify-center p-6 text-left">
                                        <h2 className="text-3xl font-bold text-gray-800">
                                            {patient.name}
                                        </h2>
                                        <p className="text-lg text-gray-600">
                                            Mãe: {patient.mother_name}
                                        </p>
                                        <p className="text-lg text-gray-600">
                                            Última Admissão:{' '}
                                            {patient.lastAdmission
                                                ?.admission_datetime
                                                ? format(
                                                      new Date(
                                                          patient.lastAdmission.admission_datetime,
                                                      ),
                                                      'dd/MM/yyyy HH:mm',
                                                      { locale: ptBR },
                                                  )
                                                : 'Data não disponível'}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                    {Math.ceil(patients.length / cardsCount) > 1 && (
                        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
                            {Array.from({
                                length: Math.ceil(patients.length / cardsCount),
                            }).map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`mx-2 h-4 w-4 rounded-full ${
                                        idx === currentPage
                                            ? 'bg-blue-300'
                                            : 'bg-gray-200'
                                    }`}
                                ></span>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default PatientTV;
