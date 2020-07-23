<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output ></xsl:output>
    
    <xsl:template match="obra">
        <!-- OBRAS ........... -->
        
        
        ###  http://www.prc.com/obras# <xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Obra ;
        :tipo "<xsl:value-of select="tipo"/>";
        <xsl:for-each select="instrumentos">
            :temPartitura : <xsl:value-of select="../../@id"/>-p<xsl:value-of select="count(preceding-sibling::*)+1"/>
        </xsl:for-each>
        <xsl:if test="compositor">
            :compostaPor : <xsl:value-of select="translate(compositor, ' ', '')"/>    
        </xsl:if>
        
        <xsl:if test="arranjo">
            :arranjadaPor : <xsl:value-of select="translate(arranjo, ' ', '')"/>
        </xsl:if>
        
        :titulo "<xsl:value-of select="titulo"/>".
        
        
        <!-- COMPOSITOR ........... -->
        
        <xsl:if test="compositor">
            ###  http://www.prc.com/obras# <xsl:value-of select="@id"/> <xsl:value-of select="translate(compositor, ' ', '')"/>
            :<xsl:value-of select="translate(compositor, ' ', '')"/> rdf:type owl:NamedIndividual ,
            :Compositor ;
            :nome "<xsl:value-of select="compositor"/>"
        </xsl:if>
        
        
        
        <xsl:for-each select="instrumentos">
            
            
            <!-- PARTITURA ........... -->
            ###  http://www.prc.com/obras# <xsl:value-of select="../../@id"/>-p<xsl:value-of select="count(preceding-sibling::*)+1"/>
            :<xsl:value-of select="../../@id"/>-p<xsl:value-of select="count(preceding-sibling::*)+1"/> rdf:type owl:NamedIndividual ,
            :Partitura ;
            :tocadaPor : <xsl:value-of select="translate(designacao, ' ', '')"/> ;
            <xsl:if test="partitura/@voz">
                :voz "<xsl:value-of select="partitura/@voz"/>";
            </xsl:if>
            <xsl:if test="partitura/@clave">
                :clave "<xsl:value-of select="partitura/@clave"/>";
            </xsl:if>
            <xsl:if test="partitura/@afinacao">
                :afinacao "<xsl:value-of select="partitura/@afinacao"/>";
            </xsl:if>
            :path <xsl:value-of select="partitura/@path"/>.
            
            <!-- INSTRUMENTO ........... -->
            <xsl:if test="not(designacao = preceding::designacao)"></xsl:if>
            ###  http://www.prc.com/obras# <xsl:value-of select="translate(designacao, ' ', '')"/>
            :<xsl:value-of select="translate(designacao, ' ', '')"/> rdf:type owl:NamedIndividual ,
            :Instrumento ;
            
        </xsl:for-each>
        
    </xsl:template>
    
</xsl:stylesheet>