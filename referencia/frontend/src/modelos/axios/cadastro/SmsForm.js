import React, { useState } from 'react';
import { sendSms } from '../../services/sendSms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SmsForm() {
  const [smsData, setSmsData] = useState({
    to: '',
    message: ''
  });

  const handleChange = (e) => {
    setSmsData({ ...smsData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendSms(smsData);
      toast.success('SMS enviado com sucesso!');
    } catch (error) {
      toast.error('Erro ao enviar SMS.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-blue-700">Envio de SMS</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de Telefone</label>
              <Input
                type="tel"
                name="to"
                value={smsData.to}
                onChange={handleChange}
                placeholder="Ex: +55 11 91234-5678"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mensagem</label>
              <Textarea
                name="message"
                value={smsData.message}
                onChange={handleChange}
                placeholder="Digite a mensagem"
                required
              />
            </div>
            <Button type="submit" className="w-full">Enviar SMS</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
